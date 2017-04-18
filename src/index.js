import $ from 'jquery';
import './style.scss';

let num = 0;

const myCounter = () => {
  num += 1;
  $('#main').html(`you've been on this page for ${num} seconds`);
};

setInterval(myCounter, 1000);
