import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const dom = $.create('div', Component.className);
      const component = new Component(dom);
      dom.html(component.toHtml());
      $root.append(dom);
      return component;
    })

    return $root;
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(c => c.init());
  }
}
