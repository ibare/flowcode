window.onload = function() {
  // create a wrapper around native canvas element (with id="c")
  var canvas = new fabric.Canvas('c');

  var text = new fabric.Text('hello', {
    fontSize: 30,
    fill: '#000',
    originX: 'center',
    originY: 'center'
  });

  var circle = new fabric.Circle({
    radius: 100,
    fill: '#eef',
    scaleY: 0.5,
    originX: 'center',
    originY: 'center'
  });

  var group = new fabric.Group([ circle, text ], {
    left: 150,
    top: 100,
  });

  canvas.add(group);
};
