import { Injectable } from '../../lib/index.js';


class ExController extends Injectable {

  move(element) {
    element.css('left', `${Math.random() * this.exService.getRange()}px`);
    element.css('top', `${Math.random() * this.exService.getRange()}px`);
  }

}
ExController.$inject = ['exService'];


export default ExController;
