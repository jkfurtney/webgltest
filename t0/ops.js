var op_functions = {};

function op_begin(data) {
  console.log(data);
}

function op_bindBuffer(data) {
  console.log(data);
}

function op_bindTexture(data) {
  console.log(data);
}

function op_clearRender(data) {
  var bits =0;
  if (data[1]) bits |= gl.COLOR_BUFFER_BIT;
  if (data[2]) bits |= gl.DEPTH_BUFFER_BIT;
  if (data[4]) bits |= gl.STENCIL_BUFFER_BIT;
  gl.clear(bits);
}

function op_cons(data) {
}

function op_deleteBuffer(data) {
  console.log(data);
}

function op_deleteTexture(data) {
  console.log(data);
}

function op_drawArray(data) {
  console.log(data);
}

function op_enableLight(data) {
  //console.log(data);
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
  var buffer_id = data[1];
  gl_buffers.buffers[buffer_id] = gl.createBuffer();
}

function op_generateTexture(data) {
  var tex_id = data[1];
  gl_textures.textures[tex_id] = gl.createTexture();
}

function op_loadIdentity(data) {
  mat4.identity(currentMatrix);
}

function op_lookAt(data) {
  mat4.lookAt(mvMatrix, data[1], data[2], data[3]);
}

function op_popAll(data) {
  console.log(data);
}

function op_popAttributes(data) {
  console.log(data);
}


var matrixStack = [];
function pushMatrix(m) {
}
function popMatrix(m) {
}

var attributeStack = [];
function pushAttrib(m) {
}
function popAttrib(m) {
}

var clientAttributeStack = [];
function pushClientAttr(m) {
}
function popClientAttr(m) {
}


function op_pushAll(data) {
  console.log(data);
}

function op_pushAttributes(data) {
  console.log(data);
}

function op_scale(data) {
  // to be in shader
  //console.log(data);
}

function op_setAlphaFunction(data) {
  // to be in shader
  //console.log(data);
}

function op_setBlendFunction(data) {
  console.log(data);
}

function op_setBufferData(data) {
  console.log(data);
}

function op_setClearColor(data) {
  gl.clearColor(data[1], data[2], data[3], 1.0);
}

function op_setClientState(data) {
  console.log(data);
}

function op_setClockwiseWinding(data) {
  console.log(data);
}

function op_setColor(data) {
  console.log(data);
}

function op_setDepthMask(data) {
  console.log(data);
}

function op_setLabel(data) {
  //  console.log(data);
}

function op_setLightAmbient(data) {
//  console.log(data);
}

function op_setLightDiffuse(data) {
//  console.log(data);
}

function op_setLightPosition(data) {
  //console.log(data);
}

function op_setLineWidth(data) {
  console.log(data);
}

var currentMatrix = undefined;
function op_setMatrixMode(data) {
  if (data[1]==5889) {
    currentMatrix = pMatrix;
  } else if (data[1]==5888) {
    currentMatrix = mvMatrix;
  }
  else throw("bad cur mat");

}

function op_setNormalPointer(data) {
  console.log(data);
}

function op_setPerspective(data) {
  var fov = data[1], aspect = data[2], znear = data[3], zfar = data[4];
  mat4.perspective(fov,aspect,znear,zfar,pMatrix);
}

function op_setPixelStore(data) {
  console.log(data);
}

function op_setPolygonMode(data) {
  console.log(data);
}

function op_setPolygonOffset(data) {
  console.log(data);
}

function op_setSmoothShadeModel(data) {
  console.log(data);
}

function op_setState(data) {
  var state = data[1];

  if (state==2903 || state==2848 || state==2832 || state==2881 || state == 2896 ||
      state==3008 || state==3552 || state==2853 || state==2852) {
    //https://stackoverflow.com/questions/20335612/how-to-perform-color-material-track-in-webgl
    return;
  }
  var on = data[2];
  if (on) {
    gl.enable(state);
  } else {
    gl.disable(state);
  }
}

function op_setTexEnvironment(data) {
  console.log(data);
}

function op_setTexImage1D(data) {
  console.log(data);
}

function op_setTexParameter(data) {
  console.log(data);
}

function op_setTexturePointer(data) {
  console.log(data);
}

function op_setTwoSidedLighting(data) {
  console.log(data);
}

function op_setVertex(data) {
  console.log(data);
}

function op_setVertexPointer(data) {
  console.log(data);
}

function op_setViewport(data) {
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
