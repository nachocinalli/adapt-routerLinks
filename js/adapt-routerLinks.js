import Adapt from 'core/js/adapt';
import router from 'core/js/router';
class RouterLinks extends Backbone.Controller {
  initialize() {
    this.listenTo(Adapt, {
      'app:dataReady': this._onDataReady
    });
  }

  _onDataReady() {
    if (!this.checkIsEnabled()) return;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.listenTo(Adapt, 'pageView:ready', this.handlePageViewReady);
    this.listenTo(Adapt, 'pageView:preRemove', this.handlePageViewPreRemove);
  }

  findRouterLinks(collection, modelId) {
    return collection.findWhere((model) => {
      return model.get('_routerLinks') && model.get('_routerLinks')._name === modelId;
    });
  }

  handlePageViewReady(view) {
    const _config = Adapt.course.get('_routerLinks');
    const _selector = _config._selector;

    $(_selector).on('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    event.preventDefault();
    const $target = $(event.currentTarget);
    const href = $target.attr('href');
    const startsWith = '#/id/';
    let modelIdStr = href.startsWith(startsWith) ? href.replace(startsWith, '') : href.replace(/^#/, '');

    if ($target.hasClass('router-link-name')) {
      let model = this.findRouterLinks(Adapt.blocks, modelIdStr);
      if (!model) {
        model = this.findRouterLinks(Adapt.components, modelIdStr);
        if (!model) {
          return console.log('routerLinks: model not found', modelIdStr);
        }
      }
      modelIdStr = model.get('_id');
    }

    if (!modelIdStr) return;
    this.navigateTo(modelIdStr);
  }

  handlePageViewPreRemove() {
    const _config = Adapt.course.get('_routerLinks');
    const _selector = _config._selector;
    $(_selector).off('click', this.handleClick.bind(this));
  }

  navigateTo(modelId) {
    _.defer(async () => {
      const isSinglePage = Adapt.contentObjects.models.length === 1;
      try {
        await router.navigateToElement(modelId, { trigger: true, replace: isSinglePage, duration: 400 });
      } catch (err) {
        console.log(`Router links cannot navigate to id: ${modelId}\n`, err);
      }
    });
  }

  checkIsEnabled() {
    const _config = Adapt.course.get('_routerLinks');
    if (!_config || !_config._isEnabled) return false;
    return true;
  }
}
export default new RouterLinks();
