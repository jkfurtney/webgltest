var op_functions = {};

function log_filter(data) { }

function op_begin(data) {
  console.log(data);
}
function op_bindBuffer(data) {
  console.log(data);
  var buffer_id = data[1];
  gl.bindBuffer(gl.ARRAY_BUFFER, gl_buffers.buffers[buffer_id]);
  gl_buffers.active = buffer_id;
}

function op_setBufferData(data) {
  console.log(data);
  var d = new Float32Array(decode(data[2]));
  console.log(d);
  gl.bufferData(gl.ARRAY_BUFFER, d, gl.STATIC_DRAW);
}

function op_setVertexPointer(data) {
  console.log(data);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
                         3, gl.FLOAT, false, 0, 0);
}

function op_setNormalPointer(data) {
  console.log(data);
}

function op_setTexturePointer(data) {
  console.log(data);
}

function op_bindTexture(data) {
  console.log(data);
   var d = data[1],
      texture = gl_textures.textures[data[2]];
  gl_textures.active = data[2];
  gl.bindTexture(gl.TEXTURE_2D,texture);
}

function getQuadVertexIndices(count) {
  var ret = [],
      i=0,
      n=parseInt(count),
      offset=0;
  for (i=0; i<n; i++) {
    offset = i*4;
    ret = ret.concat([0+offset,1+offset,2+offset,
                      0+offset,2+offset,3+offset]);
  }
  return ret;
}

function getQuadVertexIndicesLine(count) {
  var ret = [],
      i=0,
      n=parseInt(count),
      offset=0;
  for (i=0; i<n; i++) {
    offset = i*4;
    ret = ret.concat([0+offset, 1+offset,
                      1+offset, 2+offset,
                      2+offset, 3+offset,
                      3+offset, 0+offset]);
  }
  return ret;
}


function op_drawArray(data) {
  console.log(data);
  setMatrixUniforms();
  gl.uniform4fv(shaderProgram.colorUniform, gl_color_set);
  var cubeVertexIndices;
  var mode = data[1],
      first = data[2],
      count = data[3];
  const GL_QUADS = 7,
        GL_POLYGON = 9;
  if (polygonMode[1] === FillPolygonMode) {
    if (mode===GL_POLYGON) {
      if (count===3) gl.drawArrays(gl.TRIANGLES, first, count);
      if (count===4) gl.drawArrays(gl.TRIANGLE_FAN, first, count);
    }
    else if (mode===GL_QUADS) {
      var cubeVerticesIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
      cubeVertexIndices = getQuadVertexIndices(count);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
      console.log(cubeVertexIndices);
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, first);
    } else {
      gl.drawArrays(mode, first, count);
    }
  }
  if (polygonMode[1] === LinePolygonMode) {
    if (mode===GL_QUADS) {
      cubeVerticesIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
      var cubeVertexIndicesLine = getQuadVertexIndicesLine(count);
      console.log(cubeVertexIndicesLine);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(cubeVertexIndicesLine), gl.STATIC_DRAW);
      gl.drawElements(gl.LINES, count, gl.UNSIGNED_SHORT, first);
    } else {
      gl.drawArrays(gl.LINE_LOOP, first, count);
    }

  }


}


function op_clearRender(data) {
  console.log(data);
  var bits =0;
  if (data[1]) bits |= gl.COLOR_BUFFER_BIT;
  if (data[2]) bits |= gl.DEPTH_BUFFER_BIT;
  if (data[4]) bits |= gl.STENCIL_BUFFER_BIT;
  gl.clear(bits);
}

function op_cons(data) {
  console.log(data);
}

function op_deleteBuffer(data) {
  console.log(data);
}

function op_deleteTexture(data) {
  console.log(data);
}

function op_enableLight(data) {
  console.log(data);
}

function op_end(data) {
  console.log(data);
}

function op_finish(data) {
  console.log(data);
}

var gl_buffers = {active: -1, buffers: {}};
var gl_textures = {active: -1, textures: {}};

function op_generateBuffer(data) {
  console.log(data);
  var buffer_id = data[1];
  gl_buffers.buffers[buffer_id] = gl.createBuffer();
}

function op_generateTexture(data) {
  console.log(data);
  var tex_id = data[1];
  gl_textures.textures[tex_id] = gl.createTexture();
}

function op_loadIdentity(data) {
  console.log(data);
  mat4.identity(currentMatrix);
}

function op_lookAt(data) {
  console.log(data);
  console.log(mvMatrix);
  mvMatrix = mat4.lookAt(mvMatrix, data[1], data[2], data[3]);
  console.log(mvMatrix);
}

function op_popAll(data) {
  console.log(data);
  op_setMatrixMode([0, GL_MODELVIEW]);
  popMatrix();
  op_setMatrixMode([0, GL_PROJECTION]);
  popMatrix();
  popClientAttrib();
  popAttrib();
}

function op_popAttributes(data) {
  console.log(data);
}

var matrixStack = [];
function pushMatrix(m) {
  matrixStack.push(currentMatrix);
}
function popMatrix(m) {
  matrixStack.pop();
}

var attributeStack = [];
function pushAttrib(m) {}
function popAttrib(m) {}
var clientAttributeStack = [];
function pushClientAttrib(m) {}
function popClientAttrib(m) {}


var GL_ALL_ATTRIB_BITS = 0x000fffff;
var GL_CLIENT_ALL_ATTRIB_BITS = 0xffffffff;
var GL_PROJECTION = 0x1701;
var GL_MODELVIEW = 0x1700;

function op_pushAll(data) {
  console.log(data);
  pushAttrib(GL_ALL_ATTRIB_BITS);
  pushClientAttrib(GL_CLIENT_ALL_ATTRIB_BITS);
  op_setMatrixMode([0,GL_PROJECTION]);
  pushMatrix();
  op_setMatrixMode([0,GL_MODELVIEW]);
  pushMatrix();
}

function op_pushAttributes(data) {
  console.log(data);
}

function op_scale(data) {
  console.log(data);
  mat4.scale(pMatrix,pMatrix,[data[1], data[2], data[3]]);
  console.log(pMatrix);
}

function op_setAlphaFunction(data) {
  // to be in shader
  console.log(data);
}

function op_setBlendFunction(data) {
  console.log(data);
}

function op_setClearColor(data) {
  console.log(data);
  gl.clearColor(data[1], data[2], data[3], 1.0);
}

function op_setClientState(data) {
  console.log(data);
  // none of this works in webGl, there is gl.enable
}

function op_setClockwiseWinding(data) {
  console.log(data);
  var on = data[1];
  if (on) gl.frontFace(gl.CW);
  else gl.frontFace(gl.CCW);
}


function op_setColor(data) {
  gl_color_set = data.slice(1,5);
  console.log(data);
}

function op_setDepthMask(data) {
  console.log(data);
}

function op_setLabel(data) {
  console.log(data);
}

function op_setLightAmbient(data) {
  console.log(data);
}

function op_setLightDiffuse(data) {
  console.log(data);
}

function op_setLightPosition(data) {
  console.log(data);
}

function op_setLineWidth(data) {
  console.log(data);
  // this does not do anything! we need to draw a strip of triangles
  // if we need lines of thickness greater than one pixel.
  gl.lineWidth(data[1]);
}

var currentMatrix = undefined;
function op_setMatrixMode(data) {
  console.log(data);
  if (data[1]==5889) {
    currentMatrix = pMatrix;
  } else if (data[1]==5888) {
    currentMatrix = mvMatrix;
  }
  else throw("bad cur mat");

}

function op_setPerspective(data) {
  console.log(data);
  var fov = data[1], aspect = data[2], znear = data[3], zfar = data[4];
  mat4.perspective(pMatrix,fov,aspect,znear,zfar);
  console.log(pMatrix);
}

function op_setPixelStore(data) {
  console.log(data);
  var store = data[1], value = data[2];
  gl.pixelStorei(store, value);
}

var polygonMode = undefined;


var PointPolygonMode=0x1B00, // GL_POINT. 6912
    LinePolygonMode=0x1B01,  //  GL_LINE. 6913
    FillPolygonMode=0x1B02; // GL_FILL 6914
function op_setPolygonMode(data) {
  console.log(data);
  if (data[2]===FillPolygonMode) {
    console.log("FillPolygonMode");
  } else if (data[2]===LinePolygonMode) {
    console.log("LinePolygonMode");
  }
  polygonMode = [data[1], data[2]];
}

function op_setPolygonOffset(data) {
  console.log(data);
  gl.polygonOffset(data[1], data[2]);
}

function op_setSmoothShadeModel(data) {
  //console.log(data);
  // no webgl equivalent
}

function op_setState(data) {
  console.log(data);
  var state = data[1];
  // webgl does not support this operation, this has to be done manually.
  if (state==2903 || state==2848 || state==2832 || state==2881 || state == 2896 ||
      state==3008 || state==3552 || state==2853 || state==2852) {
    console.log("unsupported state: "+state);
    //https://stackoverflow.com/questions/20335612/how-to-perform-color-material-track-in-webgl
    return;
  }
  console.log("OK state: "+state);

  var on = data[2];
  if (on) {
    gl.enable(state);
  } else {
    gl.disable(state);
  }
}

function op_setTexEnvironment(data) {
  console.log(data);
  // no webgl equivilent
}

function op_setTexImage1D(data) {
  console.log(data);
  // level,texFormat,width,border,pixFormat,type,data
  var pixels = new Uint8Array(decode(data[7])),
      level = data[1],
      width = data[3];
  //console.log(data);
  //console.log(pixels);
  gl.texImage2D(gl.TEXTURE_2D,level,gl.RGBA,width,1,0,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
}

function op_setTexParameter(data) {
  console.log(data);
  var pname = data[2],
      param = data[3];
  if (param!==10496) {
    gl.texParameteri(gl.TEXTURE_2D,pname,param);
  }
}

function op_setTwoSidedLighting(data) {
  console.log(data);
  // no webgl eq
}

function op_setVertex(data) {
  console.log(data);
}

function op_setViewport(data) {
  console.log(data);
  //gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.viewport(data[1], data[2], data[3], data[4]);
}

op_functions["begin"] = op_begin;
op_functions["bindBuffer"] = op_bindBuffer;
op_functions["bindTexture"] = op_bindTexture;
op_functions["clearRender"] = op_clearRender;
op_functions["cons"] = op_cons;
op_functions["deleteBuffer"] = op_deleteBuffer;
op_functions["deleteTexture"] = op_deleteTexture;
op_functions["drawArray"] = op_drawArray;
op_functions["enableLight"] = op_enableLight;
op_functions["end"] = op_end;
op_functions["finish"] = op_finish;
op_functions["generateBuffer"] = op_generateBuffer;
op_functions["generateTexture"] = op_generateTexture;
op_functions["loadIdentity"] = op_loadIdentity;
op_functions["lookAt"] = op_lookAt;
op_functions["popAll"] = op_popAll;
op_functions["popAttributes"] = op_popAttributes;
op_functions["pushAll"] = op_pushAll;
op_functions["pushAttributes"] = op_pushAttributes;
op_functions["scale"] = op_scale;
op_functions["setAlphaFunction"] = op_setAlphaFunction;
op_functions["setBlendFunction"] = op_setBlendFunction;
op_functions["setBufferData"] = op_setBufferData;
op_functions["setClearColor"] = op_setClearColor;
op_functions["setClientState"] = op_setClientState;
op_functions["setClockwiseWinding"] = op_setClockwiseWinding;
op_functions["setColor"] = op_setColor;
op_functions["setDepthMask"] = op_setDepthMask;
op_functions["setLabel"] = op_setLabel;
op_functions["setLightAmbient"] = op_setLightAmbient;
op_functions["setLightDiffuse"] = op_setLightDiffuse;
op_functions["setLightPosition"] = op_setLightPosition;
op_functions["setLineWidth"] = op_setLineWidth;
op_functions["setMatrixMode"] = op_setMatrixMode;
op_functions["setNormalPointer"] = op_setNormalPointer;
op_functions["setPerspective"] = op_setPerspective;
op_functions["setPixelStore"] = op_setPixelStore;
op_functions["setPolygonMode"] = op_setPolygonMode;
op_functions["setPolygonOffset"] = op_setPolygonOffset;
op_functions["setSmoothShadeModel"] = op_setSmoothShadeModel;
op_functions["setState"] = op_setState;
op_functions["setTexEnvironment"] = op_setTexEnvironment;
op_functions["setTexImage1D"] = op_setTexImage1D;
op_functions["setTexParameter"] = op_setTexParameter;
op_functions["setTexturePointer"] = op_setTexturePointer;
op_functions["setTwoSidedLighting"] = op_setTwoSidedLighting;
op_functions["setVertex"] = op_setVertex;
op_functions["setVertexPointer"] = op_setVertexPointer;
op_functions["setViewport"] = op_setViewport;
