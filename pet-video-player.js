/* Shared companion-style video layer. */
(function (global) {
  class PetVideoController {
    constructor({ video, poster, assets, context, onStateChange }) {
      this.video = video;
      this.poster = poster;
      this.assets = (Array.isArray(assets) ? assets : []).map(PetVideoController.normalizeAsset).filter(Boolean);
      this.context = context || {};
      this.onStateChange = onStateChange || function () {};
      this.state = 'idle';
      this.asset = null;
      this.isVisible = true;
      this.boundEnded = () => this.handleEnded();
      this.boundError = () => this.handleError();
      this.boundVisibility = () => {
        this.isVisible = document.visibilityState === 'visible';
        if (this.isVisible && this.state !== 'error') this.resume();
        else this.pause();
      };
      this.boundPageHide = () => this.pause();
      this.boundPageShow = () => {
        this.isVisible = true;
        if (this.state !== 'error') this.resume();
      };
      this.video.addEventListener('ended', this.boundEnded);
      this.video.addEventListener('error', this.boundError);
      document.addEventListener('visibilitychange', this.boundVisibility);
      window.addEventListener('pagehide', this.boundPageHide);
      window.addEventListener('pageshow', this.boundPageShow);
      this.showPoster();
    }

    static normalizeAsset(raw) {
      if (!raw || typeof raw !== 'object') return null;
      return {
        ...raw,
        id: raw.id,
        userId: raw.userId ?? raw.user_id,
        petId: raw.petId ?? raw.pet_id,
        species: raw.species ?? raw.pet_species,
        action: raw.action ?? raw.videoName ?? raw.video_name,
        videoName: raw.videoName ?? raw.video_name ?? raw.action,
        videoUrl: raw.videoUrl ?? raw.video_url,
        posterUrl: raw.posterUrl ?? raw.poster_url,
        status: raw.status,
        createdAt: raw.createdAt ?? raw.created_at
      };
    }

    static isValidAsset(asset) {
      return Boolean(
        asset && asset.status === 'success' &&
        typeof asset.videoUrl === 'string' &&
        asset.videoUrl.trim() && /\.mp4(?:$|[?#])/i.test(asset.videoUrl)
      );
    }

    selectAsset({ action, petId, userId, species } = {}) {
      const valid = this.assets.filter(PetVideoController.isValidAsset);
      const score = asset => {
        let value = 0;
        if (asset.petId && asset.petId === petId) value += 100;
        if (asset.userId && asset.userId === userId) value += 30;
        if (asset.species && asset.species === species) value += 15;
        if (action && (asset.action === action || asset.videoName === action)) value += 10;
        return value;
      };
      return valid
        .map(asset => ({ asset, score: score(asset) }))
        .sort((a, b) => b.score - a.score || String(b.asset.createdAt).localeCompare(String(a.asset.createdAt)))[0]?.asset || null;
    }

    setState(state, { action, loop = state === 'idle' } = {}) {
      this.state = state;
      if (state === 'responding') {
        this.asset = this.selectAsset({ ...this.context, action });
        if (this.asset) this.playAsset(this.asset, loop);
        else this.handleError('no matching successful asset');
      } else if (state === 'idle') {
        // Prefer an explicit idle clip, then use the configured natural idle
        // action (for example curled-deep-sleep) before falling back to poster.
        this.asset = this.selectAsset({ ...this.context, action: 'idle' });
        if (!this.asset && this.context.idleAction) {
          this.asset = this.selectAsset({ ...this.context, action: this.context.idleAction });
        }
        if (this.asset) this.playAsset(this.asset, true);
        else this.showPoster();
      } else {
        // Listening/processing keep the current visual stable and do not load a
        // second video instance, so audio capture and text recognition remain independent.
        this.onStateChange(state, this.asset);
        this.resume();
      }
    }

    playAsset(asset, loop) {
      this.asset = asset;
      this.video.loop = loop;
      this.video.poster = asset.posterUrl || this.poster;
      this.video.src = asset.videoUrl;
      this.video.load();
      this.video.classList.add('playing');
      this.video.play().then(() => this.onStateChange(this.state, asset)).catch(() => this.handleError('play rejected'));
    }

    showPoster() {
      this.video.pause();
      this.video.removeAttribute('src');
      this.video.load();
      this.video.classList.remove('playing');
      this.video.poster = this.poster;
      this.onStateChange(this.state, null);
    }

    resume() {
      if (!this.isVisible || !this.video.src || this.state === 'error') return;
      this.video.play().catch(() => {});
    }

    pause() { this.video.pause(); }

    handleEnded() {
      if (this.state === 'responding') this.setState('idle');
    }

    handleError(reason) {
      console.warn('[PetVideoController] fallback to poster:', reason || 'video load error');
      this.state = 'error';
      this.showPoster();
      this.onStateChange('error', null);
    }

    destroy() {
      this.pause();
      this.video.removeEventListener('ended', this.boundEnded);
      this.video.removeEventListener('error', this.boundError);
      document.removeEventListener('visibilitychange', this.boundVisibility);
      window.removeEventListener('pagehide', this.boundPageHide);
      window.removeEventListener('pageshow', this.boundPageShow);
      this.video.removeAttribute('src');
      this.video.load();
    }
  }

  global.PetVideoController = PetVideoController;
})(window);
