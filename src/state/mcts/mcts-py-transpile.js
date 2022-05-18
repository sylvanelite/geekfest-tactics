
var $B = __BRYTHON__,
    _b_ = __BRYTHON__.builtins,
    $locals = $locals___main__;

$locals___main__.__package__ = ""
$locals.__annotations__ = $B.empty_dict()
var $top_frame = ["__main__", $locals___main__, "__main__", $locals___main__]
$locals.$f_trace = $B.enter_frame($top_frame)
var $stack_length = $B.frames_stack.length;
try{
  ;$locals.$line_info = "2,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
  var $Stat_371 = (function(){
    var $locals___main___Stat_371 = {__annotations__: $B.empty_dict()},
        $locals = $locals___main___Stat_371
    $locals.$name = "Stat"
    $locals.$qualname = "Stat"
    $locals.$is_class = true;
    $locals.$line_info = "2,__main__";
    var $top_frame = ["$locals___main___Stat_371", $locals,"__main__", $locals___main__]
    $locals.$f_trace = $B.enter_frame($top_frame);
    if($locals.$f_trace !== _b_.None){
      $locals.$f_trace = $B.trace_line()
    }
    ;$locals.$line_info = "3,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    $locals___main___Stat_371["__slots__"] = $B.fast_tuple([$B.String('value'),$B.String('visits')]);
    ;$locals.$line_info = "5,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    var __init__$481 = function($defaults){
      function __init__481(_self, _value, _visits){
        var $locals___main___Stat_371___init___372 = {},
            $locals = $locals___main___Stat_371___init___372;
        var $len = arguments.length;
        var last_arg;if($len > 0 && ((last_arg = arguments[$len - 1]) !== undefined) && last_arg.$nat !== undefined){
          $locals___main___Stat_371___init___372 = $locals = $B.args("__init__", 3, {"self":null, "value":null, "visits":null}, ["self", "value", "visits"], arguments, $defaults, null, null);
        }else{
          if($len == 3){
            $locals___main___Stat_371___init___372 = $locals = $B.conv_undef({"self": _self, "value": _value, "visits": _visits})
          }else if($len > 3){
            $B.wrong_nb_args("__init__", $len, 3, ["self","value","visits"])
          }else if($len + Object.keys($defaults).length < 3){
            $B.wrong_nb_args("__init__", $len, 3, ["self","value","visits"])
          }else{
            $locals___main___Stat_371___init___372 = $locals = $B.conv_undef({"self": _self, "value": _value, "visits": _visits})
            var defparams = ["self","value","visits"]
            for(var i = $len; i < defparams.length; i++){
              $locals[defparams[i]] = $defaults[defparams[i]]
            }
          }
        }
        $locals.$line_info = "5,__main__"
        var $top_frame = ["__main___Stat_371___init___372", $locals,"__main__", $locals___main__, __init__481]
        $locals.$f_trace = $B.enter_frame($top_frame)
        var $stack_length = $B.frames_stack.length;
        try{
          $locals.__class__ = $B.get_method_class($locals___main__, "Stat")
          $B.js_this = this;
          ;$locals.$line_info = "6,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"value",$locals["value"]);_b_.None;;
          ;$locals.$line_info = "7,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"visits",$locals["visits"]);_b_.None;;
          if($locals.$f_trace !== _b_.None){
            $B.trace_return(_b_.None)
          }
          $B.leave_frame({$locals});return _b_.None
        }catch(err){
          $B.set_exc(err)
          if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
            $locals.$f_trace = $B.trace_exception()
          }
          $B.leave_frame({$locals});throw err
        }
      }
      __init__481.$is_func = true
      __init__481.$infos = {
        __name__:"__init__",
        __qualname__:"Stat.__init__",
        __defaults__ : $B.fast_tuple([$defaults.value, $defaults.visits]),
        __kwdefaults__ : _b_.None,
        __annotations__: {},
        __dict__: $B.empty_dict(),
        __doc__: _b_.None,
        __module__ : "__main__",
        __code__:{
          co_argcount:3,
          co_filename:$locals___main__["__file__"] || "<string>",
          co_firstlineno:5,
          co_flags:67,
          co_freevars: [],
          co_kwonlyargcount:0,
          co_name: "__init__",
          co_nlocals: 3,
          co_posonlyargcount: 0,
          co_varnames: $B.fast_tuple(["self", "value", "visits"])
        }
      };_b_.None;
      return __init__481
    }
    $locals___main___Stat_371["__init__"] = __init__$481({value:(new Number(0.0)), visits:0})
    $locals___main___Stat_371["__init__"].$set_defaults = function(value){
      return $locals___main___Stat_371["__init__"] = __init__$481(value)
    }
    ;$locals.$line_info = "9,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    var __repr__$482 = function($defaults){
      function __repr__482(_self){
        var $locals___main___Stat_371___repr___373 = {},
            $locals = $locals___main___Stat_371___repr___373;
        var $len = arguments.length;
        var last_arg;if($len > 0 && ((last_arg = arguments[$len - 1]) !== undefined) && last_arg.$nat !== undefined){
          $locals___main___Stat_371___repr___373 = $locals = $B.args("__repr__", 1, {"self":null}, ["self"], arguments, $defaults, null, null);
        }else{
          if($len == 1){
            $locals___main___Stat_371___repr___373 = $locals = $B.conv_undef({"self": _self})
          }else if($len > 1){
            $B.wrong_nb_args("__repr__", $len, 1, ["self"])
          }else if($len + Object.keys($defaults).length < 1){
            $B.wrong_nb_args("__repr__", $len, 1, ["self"])
          }else{
            $locals___main___Stat_371___repr___373 = $locals = $B.conv_undef({"self": _self})
            var defparams = ["self"]
            for(var i = $len; i < defparams.length; i++){
              $locals[defparams[i]] = $defaults[defparams[i]]
            }
          }
        }
        $locals.$line_info = "9,__main__"
        var $top_frame = ["__main___Stat_371___repr___373", $locals,"__main__", $locals___main__, __repr__482]
        $locals.$f_trace = $B.enter_frame($top_frame)
        var $stack_length = $B.frames_stack.length;
        try{
          $locals.__class__ = $B.get_method_class($locals___main__, "Stat")
          $B.js_this = this;
          ;$locals.$line_info = "10,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          var $res = $B.$call($B.$getattr($B.String("Stat(value={}, visits={})"),"format"))($B.$getattr($locals["self"],"value"), $B.$getattr($locals["self"],"visits"));
          if($locals.$f_trace !== _b_.None){
            $B.trace_return($res)
          }
          $B.leave_frame({$locals});
          return $res;
        }catch(err){
          $B.set_exc(err)
          if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
            $locals.$f_trace = $B.trace_exception()
          }
          $B.leave_frame({$locals});throw err
        }
      }
      __repr__482.$is_func = true
      __repr__482.$infos = {
        __name__:"__repr__",
        __qualname__:"Stat.__repr__",
        __defaults__ : _b_.None,
        __kwdefaults__ : _b_.None,
        __annotations__: {},
        __dict__: $B.empty_dict(),
        __doc__: _b_.None,
        __module__ : "__main__",
        __code__:{
          co_argcount:1,
          co_filename:$locals___main__["__file__"] || "<string>",
          co_firstlineno:9,
          co_flags:67,
          co_freevars: [],
          co_kwonlyargcount:0,
          co_name: "__repr__",
          co_nlocals: 1,
          co_posonlyargcount: 0,
          co_varnames: $B.fast_tuple(["self"])
        }
      };_b_.None;
      return __repr__482
    }
    $locals___main___Stat_371["__repr__"] = __repr__$482({})
    $locals___main___Stat_371["__repr__"].$set_defaults = function(value){
      return $locals___main___Stat_371["__repr__"] = __repr__$482(value)
    }
    if($locals.$f_trace !== _b_.None){
      $B.trace_return(_b_.None)
    }
    $B.leave_frame({$locals})
    return $locals___main___Stat_371;
  }
  )();
  $Stat_371.__module__ = $locals___main__.__name__
  ;$locals___main__["Stat"] = $B.$class_constructor("Stat", $Stat_371, _b_.tuple.$factory([_b_.object]),["_b_.object"],[])
  ;$locals___main__["Stat"].__doc__ = _b_.None;
  _b_.None;
  ;$locals.$line_info = "13,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
  var $UCT_374 = (function(){
    var $locals___main___UCT_374 = {__annotations__: $B.empty_dict()},
        $locals = $locals___main___UCT_374
    $locals.$name = "UCT"
    $locals.$qualname = "UCT"
    $locals.$is_class = true;
    $locals.$line_info = "13,__main__";
    var $top_frame = ["$locals___main___UCT_374", $locals,"__main__", $locals___main__]
    $locals.$f_trace = $B.enter_frame($top_frame);
    if($locals.$f_trace !== _b_.None){
      $locals.$f_trace = $B.trace_line()
    }
    ;$locals.$line_info = "14,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    var __init__$483 = function($defaults){
      function __init__483(){
        var $locals___main___UCT_374___init___375 = {},
            $locals = $locals___main___UCT_374___init___375;
        $locals___main___UCT_374___init___375 = $locals = $B.args("__init__", 2, {"self":null, "board":null}, ["self", "board"], arguments, $defaults, null, "kwargs");
        $locals.$line_info = "14,__main__"
        var $top_frame = ["__main___UCT_374___init___375", $locals,"__main__", $locals___main__, __init__483]
        $locals.$f_trace = $B.enter_frame($top_frame)
        var $stack_length = $B.frames_stack.length;
        try{
          $locals.__class__ = $B.get_method_class($locals___main__, "UCT")
          $B.js_this = this;
          ;$locals.$line_info = "15,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"board",$locals["board"]);_b_.None;;
          ;$locals.$line_info = "16,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"history",$B.$list([]));_b_.None;;
          ;$locals.$line_info = "17,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"stats",_b_.dict.$factory([]));_b_.None;;
          ;$locals.$line_info = "19,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"max_depth",0);_b_.None;;
          ;$locals.$line_info = "20,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"data",_b_.dict.$factory([]));_b_.None;;
          ;$locals.$line_info = "22,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"calculation_time",$B.$call(_b_.float)($B.$call($B.$getattr($locals["kwargs"],"get"))($B.String('time'), 30)));_b_.None;;
          ;$locals.$line_info = "23,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"max_actions",$B.$call(_b_.int)($B.$call($B.$getattr($locals["kwargs"],"get"))($B.String('max_actions'), 1000)));_b_.None;;
          ;$locals.$line_info = "27,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"C",$B.$call(_b_.float)($B.$call($B.$getattr($locals["kwargs"],"get"))($B.String('C'), (new Number(1.4)))));_b_.None;;
          if($locals.$f_trace !== _b_.None){
            $B.trace_return(_b_.None)
          }
          $B.leave_frame({$locals});return _b_.None
        }catch(err){
          $B.set_exc(err)
          if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
            $locals.$f_trace = $B.trace_exception()
          }
          $B.leave_frame({$locals});throw err
        }
      }
      __init__483.$is_func = true
      __init__483.$infos = {
        __name__:"__init__",
        __qualname__:"UCT.__init__",
        __defaults__ : _b_.None,
        __kwdefaults__ : _b_.None,
        __annotations__: {},
        __dict__: $B.empty_dict(),
        __doc__: _b_.None,
        __module__ : "__main__",
        __code__:{
          co_argcount:2,
          co_filename:$locals___main__["__file__"] || "<string>",
          co_firstlineno:14,
          co_flags:75,
          co_freevars: [],
          co_kwonlyargcount:0,
          co_name: "__init__",
          co_nlocals: 3,
          co_posonlyargcount: 0,
          co_varnames: $B.fast_tuple(["self", "board", "kwargs"])
        }
      };_b_.None;
      return __init__483
    }
    $locals___main___UCT_374["__init__"] = __init__$483({})
    $locals___main___UCT_374["__init__"].$set_defaults = function(value){
      return $locals___main___UCT_374["__init__"] = __init__$483(value)
    }
    ;$locals.$line_info = "29,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    var update$484 = function($defaults){
      function update484(_self, _state){
        var $locals___main___UCT_374_update_376 = {},
            $locals = $locals___main___UCT_374_update_376;
        var $len = arguments.length;
        var last_arg;if($len > 0 && ((last_arg = arguments[$len - 1]) !== undefined) && last_arg.$nat !== undefined){
          $locals___main___UCT_374_update_376 = $locals = $B.args("update", 2, {"self":null, "state":null}, ["self", "state"], arguments, $defaults, null, null);
        }else{
          if($len == 2){
            $locals___main___UCT_374_update_376 = $locals = $B.conv_undef({"self": _self, "state": _state})
          }else if($len > 2){
            $B.wrong_nb_args("update", $len, 2, ["self","state"])
          }else if($len + Object.keys($defaults).length < 2){
            $B.wrong_nb_args("update", $len, 2, ["self","state"])
          }else{
            $locals___main___UCT_374_update_376 = $locals = $B.conv_undef({"self": _self, "state": _state})
            var defparams = ["self","state"]
            for(var i = $len; i < defparams.length; i++){
              $locals[defparams[i]] = $defaults[defparams[i]]
            }
          }
        }
        $locals.$line_info = "29,__main__"
        var $top_frame = ["__main___UCT_374_update_376", $locals,"__main__", $locals___main__, update484]
        $locals.$f_trace = $B.enter_frame($top_frame)
        var $stack_length = $B.frames_stack.length;
        try{
          $locals.__class__ = $B.get_method_class($locals___main__, "UCT")
          $B.js_this = this;
          ;$locals.$line_info = "30,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$call($B.$getattr($B.$getattr($locals["self"],"history"),"append"))($B.$call($B.$getattr($B.$getattr($locals["self"],"board"),"to_compact_state"))($locals["state"]));
          if($locals.$f_trace !== _b_.None){
            $B.trace_return(_b_.None)
          }
          $B.leave_frame({$locals});return _b_.None
        }catch(err){
          $B.set_exc(err)
          if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
            $locals.$f_trace = $B.trace_exception()
          }
          $B.leave_frame({$locals});throw err
        }
      }
      update484.$is_func = true
      update484.$infos = {
        __name__:"update",
        __qualname__:"UCT.update",
        __defaults__ : _b_.None,
        __kwdefaults__ : _b_.None,
        __annotations__: {},
        __dict__: $B.empty_dict(),
        __doc__: _b_.None,
        __module__ : "__main__",
        __code__:{
          co_argcount:2,
          co_filename:$locals___main__["__file__"] || "<string>",
          co_firstlineno:29,
          co_flags:67,
          co_freevars: [],
          co_kwonlyargcount:0,
          co_name: "update",
          co_nlocals: 2,
          co_posonlyargcount: 0,
          co_varnames: $B.fast_tuple(["self", "state"])
        }
      };_b_.None;
      return update484
    }
    $locals___main___UCT_374["update"] = update$484({})
    $locals___main___UCT_374["update"].$set_defaults = function(value){
      return $locals___main___UCT_374["update"] = update$484(value)
    }
    ;$locals.$line_info = "32,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    var display$485 = function($defaults){
      function display485(_self, _state, _action){
        var $locals___main___UCT_374_display_377 = {},
            $locals = $locals___main___UCT_374_display_377;
        var $len = arguments.length;
        var last_arg;if($len > 0 && ((last_arg = arguments[$len - 1]) !== undefined) && last_arg.$nat !== undefined){
          $locals___main___UCT_374_display_377 = $locals = $B.args("display", 3, {"self":null, "state":null, "action":null}, ["self", "state", "action"], arguments, $defaults, null, null);
        }else{
          if($len == 3){
            $locals___main___UCT_374_display_377 = $locals = $B.conv_undef({"self": _self, "state": _state, "action": _action})
          }else if($len > 3){
            $B.wrong_nb_args("display", $len, 3, ["self","state","action"])
          }else if($len + Object.keys($defaults).length < 3){
            $B.wrong_nb_args("display", $len, 3, ["self","state","action"])
          }else{
            $locals___main___UCT_374_display_377 = $locals = $B.conv_undef({"self": _self, "state": _state, "action": _action})
            var defparams = ["self","state","action"]
            for(var i = $len; i < defparams.length; i++){
              $locals[defparams[i]] = $defaults[defparams[i]]
            }
          }
        }
        $locals.$line_info = "32,__main__"
        var $top_frame = ["__main___UCT_374_display_377", $locals,"__main__", $locals___main__, display485]
        $locals.$f_trace = $B.enter_frame($top_frame)
        var $stack_length = $B.frames_stack.length;
        try{
          $locals.__class__ = $B.get_method_class($locals___main__, "UCT")
          $B.js_this = this;
          ;$locals.$line_info = "33,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          var $res = $B.$call($B.$getattr($B.$getattr($locals["self"],"board"),"display"))($locals["state"], $locals["action"]);
          if($locals.$f_trace !== _b_.None){
            $B.trace_return($res)
          }
          $B.leave_frame({$locals});
          return $res;
        }catch(err){
          $B.set_exc(err)
          if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
            $locals.$f_trace = $B.trace_exception()
          }
          $B.leave_frame({$locals});throw err
        }
      }
      display485.$is_func = true
      display485.$infos = {
        __name__:"display",
        __qualname__:"UCT.display",
        __defaults__ : _b_.None,
        __kwdefaults__ : _b_.None,
        __annotations__: {},
        __dict__: $B.empty_dict(),
        __doc__: _b_.None,
        __module__ : "__main__",
        __code__:{
          co_argcount:3,
          co_filename:$locals___main__["__file__"] || "<string>",
          co_firstlineno:32,
          co_flags:67,
          co_freevars: [],
          co_kwonlyargcount:0,
          co_name: "display",
          co_nlocals: 3,
          co_posonlyargcount: 0,
          co_varnames: $B.fast_tuple(["self", "state", "action"])
        }
      };_b_.None;
      return display485
    }
    $locals___main___UCT_374["display"] = display$485({})
    $locals___main___UCT_374["display"].$set_defaults = function(value){
      return $locals___main___UCT_374["display"] = display$485(value)
    }
    ;$locals.$line_info = "35,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    var winner_message$486 = function($defaults){
      function winner_message486(_self, _winners){
        var $locals___main___UCT_374_winner_message_378 = {},
            $locals = $locals___main___UCT_374_winner_message_378;
        var $len = arguments.length;
        var last_arg;if($len > 0 && ((last_arg = arguments[$len - 1]) !== undefined) && last_arg.$nat !== undefined){
          $locals___main___UCT_374_winner_message_378 = $locals = $B.args("winner_message", 2, {"self":null, "winners":null}, ["self", "winners"], arguments, $defaults, null, null);
        }else{
          if($len == 2){
            $locals___main___UCT_374_winner_message_378 = $locals = $B.conv_undef({"self": _self, "winners": _winners})
          }else if($len > 2){
            $B.wrong_nb_args("winner_message", $len, 2, ["self","winners"])
          }else if($len + Object.keys($defaults).length < 2){
            $B.wrong_nb_args("winner_message", $len, 2, ["self","winners"])
          }else{
            $locals___main___UCT_374_winner_message_378 = $locals = $B.conv_undef({"self": _self, "winners": _winners})
            var defparams = ["self","winners"]
            for(var i = $len; i < defparams.length; i++){
              $locals[defparams[i]] = $defaults[defparams[i]]
            }
          }
        }
        $locals.$line_info = "35,__main__"
        var $top_frame = ["__main___UCT_374_winner_message_378", $locals,"__main__", $locals___main__, winner_message486]
        $locals.$f_trace = $B.enter_frame($top_frame)
        var $stack_length = $B.frames_stack.length;
        try{
          $locals.__class__ = $B.get_method_class($locals___main__, "UCT")
          $B.js_this = this;
          ;$locals.$line_info = "36,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          var $res = $B.$call($B.$getattr($B.$getattr($locals["self"],"board"),"winner_message"))($locals["winners"]);
          if($locals.$f_trace !== _b_.None){
            $B.trace_return($res)
          }
          $B.leave_frame({$locals});
          return $res;
        }catch(err){
          $B.set_exc(err)
          if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
            $locals.$f_trace = $B.trace_exception()
          }
          $B.leave_frame({$locals});throw err
        }
      }
      winner_message486.$is_func = true
      winner_message486.$infos = {
        __name__:"winner_message",
        __qualname__:"UCT.winner_message",
        __defaults__ : _b_.None,
        __kwdefaults__ : _b_.None,
        __annotations__: {},
        __dict__: $B.empty_dict(),
        __doc__: _b_.None,
        __module__ : "__main__",
        __code__:{
          co_argcount:2,
          co_filename:$locals___main__["__file__"] || "<string>",
          co_firstlineno:35,
          co_flags:67,
          co_freevars: [],
          co_kwonlyargcount:0,
          co_name: "winner_message",
          co_nlocals: 2,
          co_posonlyargcount: 0,
          co_varnames: $B.fast_tuple(["self", "winners"])
        }
      };_b_.None;
      return winner_message486
    }
    $locals___main___UCT_374["winner_message"] = winner_message$486({})
    $locals___main___UCT_374["winner_message"].$set_defaults = function(value){
      return $locals___main___UCT_374["winner_message"] = winner_message$486(value)
    }
    ;$locals.$line_info = "38,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    var get_action$487 = function($defaults){
      function get_action487(_self){
        var $locals___main___UCT_374_get_action_379 = {},
            $locals = $locals___main___UCT_374_get_action_379;
        var $len = arguments.length;
        var last_arg;if($len > 0 && ((last_arg = arguments[$len - 1]) !== undefined) && last_arg.$nat !== undefined){
          $locals___main___UCT_374_get_action_379 = $locals = $B.args("get_action", 1, {"self":null}, ["self"], arguments, $defaults, null, null);
        }else{
          if($len == 1){
            $locals___main___UCT_374_get_action_379 = $locals = $B.conv_undef({"self": _self})
          }else if($len > 1){
            $B.wrong_nb_args("get_action", $len, 1, ["self"])
          }else if($len + Object.keys($defaults).length < 1){
            $B.wrong_nb_args("get_action", $len, 1, ["self"])
          }else{
            $locals___main___UCT_374_get_action_379 = $locals = $B.conv_undef({"self": _self})
            var defparams = ["self"]
            for(var i = $len; i < defparams.length; i++){
              $locals[defparams[i]] = $defaults[defparams[i]]
            }
          }
        }
        $locals.$line_info = "38,__main__"
        var $top_frame = ["__main___UCT_374_get_action_379", $locals,"__main__", $locals___main__, get_action487]
        $locals.$f_trace = $B.enter_frame($top_frame)
        var $stack_length = $B.frames_stack.length;
        try{
          $locals.__class__ = $B.get_method_class($locals___main__, "UCT")
          $B.js_this = this;
          ;$locals.$line_info = "42,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"max_depth",0);_b_.None;;
          ;$locals.$line_info = "43,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$setattr($locals["self"],"data",_b_.dict.$factory([[$B.String('C'),$B.$getattr($locals["self"],"C")],[$B.String('max_actions'),$B.$getattr($locals["self"],"max_actions")],[$B.String('name'),$B.$getattr($locals["self"],"name")]]));_b_.None;;
          ;$locals.$line_info = "44,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $B.$call($B.$getattr($B.$getattr($locals["self"],"stats"),"clear"))();
          ;$locals.$line_info = "46,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $locals___main___UCT_374_get_action_379["state"] = $B.$getitem($B.$getattr($locals["self"],"history"),-1);
          ;$locals.$line_info = "47,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $locals___main___UCT_374_get_action_379["player"] = $B.$call($B.$getattr($B.$getattr($locals["self"],"board"),"current_player"))($locals["state"]);
          ;$locals.$line_info = "48,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $locals___main___UCT_374_get_action_379["legal"] = $B.$call($B.$getattr($B.$getattr($locals["self"],"board"),"legal_actions"))($locals["state"]);
          ;$locals.$line_info = "51,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          if($B.$bool(!$B.$bool($locals["legal"]))){
            ;$locals.$line_info = "52,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            var $res = _b_.dict.$factory([[$B.String('type'),$B.String('action')],[$B.String('message'),_b_.None],[$B.String('extras'),$B.$call($B.$getattr($B.$getattr($locals["self"],"data"),"copy"))()]]);
            if($locals.$f_trace !== _b_.None){
              $B.trace_return($res)
            }
            $B.leave_frame({$locals});
            return $res;
          }
          ;$locals.$line_info = "53,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          if($B.$bool($B.rich_comp("__eq__",$B.$call(_b_.len)($locals["legal"]),1))){
            ;$locals.$line_info = "54,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            var $res = _b_.dict.$factory([[$B.String('type'),$B.String('action')],[$B.String('message'),$B.$call($B.$getattr($B.$getattr($locals["self"],"board"),"to_json_action"))($B.$getitem($locals["legal"],0))],[$B.String('extras'),$B.$call($B.$getattr($B.$getattr($locals["self"],"data"),"copy"))()]]);
            if($locals.$f_trace !== _b_.None){
              $B.trace_return($res)
            }
            $B.leave_frame({$locals});
            return $res;
          }
          ;$locals.$line_info = "60,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $locals___main___UCT_374_get_action_379["games"] = 0;
          ;$locals.$line_info = "61,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $locals___main___UCT_374_get_action_379["begin"] = $B.$call($B.$getattr($B.$global_search("time", ["__main___UCT_374_get_action_379", "__main__"]),"time"))();
          var $no_break488 = true
          ;$locals.$line_info = "62,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          while($B.$bool($no_break488 && $B.rich_comp("__lt__",$B.rich_op("__sub__", $B.$call($B.$getattr($B.$global_search("time", ["__main___UCT_374_get_action_379", "__main__"]),"time"))(), $locals["begin"]),$B.$getattr($locals["self"],"calculation_time")))){
            ;$locals.$line_info = "63,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            $B.$call($B.$getattr($locals["self"],"run_simulation"))();
            ;$locals.$line_info = "64,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            $locals___main___UCT_374_get_action_379['games'] = (typeof $locals["games"] == "number" && $B.is_safe_int($locals.$result = $locals["games"] + 1)) ? $locals.$result : $B.augm_assign($locals["games"], '+=', 1);
            $locals.$line_info = "62,__main__";if($locals.$f_trace !== _b_.None){
              $B.trace_line()};_b_.None;
            }
            ;$locals.$line_info = "68,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            $B.$call($B.$getattr($B.$getattr($locals["self"],"data"),"update"))({$nat:"kw",kw:{games:$locals["games"], max_depth:$B.$getattr($locals["self"],"max_depth"), time:$B.$call(_b_.str)($B.rich_op("__sub__", $B.$call($B.$getattr($B.$global_search("time", ["__main___UCT_374_get_action_379", "__main__"]),"time"))(), $locals["begin"]))}});
            ;$locals.$line_info = "70,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            $B.$call(_b_.print)($B.$getitem($B.$getattr($locals["self"],"data"),$B.String('games')), $B.$getitem($B.$getattr($locals["self"],"data"),$B.String('time')));
            ;$locals.$line_info = "71,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            $B.$call(_b_.print)($B.String("Maximum depth searched:"), $B.$getattr($locals["self"],"max_depth"));
            ;$locals.$line_info = "74,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            var $temp527 = $B.$getattr($locals["self"],"data")
            if(Array.isArray($temp527) && !$temp527.__class__){
              $B.set_list_key($temp527,$B.String('actions'),$B.$call($B.$getattr($locals["self"],"calculate_action_values"))($B.$getattr($locals["self"],"history"), $locals["player"], $locals["legal"]))
            }else{
              $B.$setitem($B.$getattr($locals["self"],"data"),$B.String('actions'),$B.$call($B.$getattr($locals["self"],"calculate_action_values"))($B.$getattr($locals["self"],"history"), $locals["player"], $locals["legal"]))};_b_.None;;
              ;$locals.$line_info = "75,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              var $no_break489 = true
              var $next_func_399 = $B.next_of($B.$getitem($B.$getattr($locals["self"],"data"),$B.String('actions')))
              while(true){
                try{
                  var $next_399 = $next_func_399()
                }catch(err){
                  if($B.is_exc(err, [_b_.StopIteration])){
                    break
                  }else{
                    $B.leave_frame({$locals, value: _b_.None});throw err
                  }
                }
                $locals___main___UCT_374_get_action_379["m"] = $next_399
                
                ;$locals.$line_info = "76,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                
                $B.$call(_b_.print)($B.$call($B.$getattr($B.$getattr($locals["self"],"action_template"),"format"))({$nat:"kw",kw:[{},$locals["m"]]}));
                ;$locals.$line_info = "75,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              }
              
              ;$locals.$line_info = "79,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              var $res = _b_.dict.$factory([[$B.String('type'),$B.String('action')],[$B.String('message'),$B.$call($B.$getattr($B.$getattr($locals["self"],"board"),"to_json_action"))($B.$getitem($B.$getitem($B.$getitem($B.$getattr($locals["self"],"data"),$B.String('actions')),0),$B.String('action')))],[$B.String('extras'),$B.$call($B.$getattr($B.$getattr($locals["self"],"data"),"copy"))()]]);
              if($locals.$f_trace !== _b_.None){
                $B.trace_return($res)
              }
              $B.leave_frame({$locals});
              return $res;
            }catch(err){
              $B.set_exc(err)
              if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
                $locals.$f_trace = $B.trace_exception()
              }
              $B.leave_frame({$locals});throw err
            }
          }
          get_action487.$is_func = true
          get_action487.$infos = {
            __name__:"get_action",
            __qualname__:"UCT.get_action",
            __defaults__ : _b_.None,
            __kwdefaults__ : _b_.None,
            __annotations__: {},
            __dict__: $B.empty_dict(),
            __doc__: _b_.None,
            __module__ : "__main__",
            __code__:{
              co_argcount:1,
              co_filename:$locals___main__["__file__"] || "<string>",
              co_firstlineno:38,
              co_flags:67,
              co_freevars: ["time","max_depth"],
              co_kwonlyargcount:0,
              co_name: "get_action",
              co_nlocals: 7,
              co_posonlyargcount: 0,
              co_varnames: $B.fast_tuple(["self", "state", "player", "legal", "games", "begin", "m"])
            }
          };_b_.None;
          return get_action487
        }
        $locals___main___UCT_374["get_action"] = get_action$487({})
        $locals___main___UCT_374["get_action"].$set_defaults = function(value){
          return $locals___main___UCT_374["get_action"] = get_action$487(value)
        }
        ;$locals.$line_info = "85,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
        var run_simulation$490 = function($defaults){
          function run_simulation490(_self){
            var $locals___main___UCT_374_run_simulation_380 = {},
                $locals = $locals___main___UCT_374_run_simulation_380;
            var $len = arguments.length;
            var last_arg;if($len > 0 && ((last_arg = arguments[$len - 1]) !== undefined) && last_arg.$nat !== undefined){
              $locals___main___UCT_374_run_simulation_380 = $locals = $B.args("run_simulation", 1, {"self":null}, ["self"], arguments, $defaults, null, null);
            }else{
              if($len == 1){
                $locals___main___UCT_374_run_simulation_380 = $locals = $B.conv_undef({"self": _self})
              }else if($len > 1){
                $B.wrong_nb_args("run_simulation", $len, 1, ["self"])
              }else if($len + Object.keys($defaults).length < 1){
                $B.wrong_nb_args("run_simulation", $len, 1, ["self"])
              }else{
                $locals___main___UCT_374_run_simulation_380 = $locals = $B.conv_undef({"self": _self})
                var defparams = ["self"]
                for(var i = $len; i < defparams.length; i++){
                  $locals[defparams[i]] = $defaults[defparams[i]]
                }
              }
            }
            $locals.$line_info = "85,__main__"
            var $top_frame = ["__main___UCT_374_run_simulation_380", $locals,"__main__", $locals___main__, run_simulation490]
            $locals.$f_trace = $B.enter_frame($top_frame)
            var $stack_length = $B.frames_stack.length;
            try{
              $locals.__class__ = $B.get_method_class($locals___main__, "UCT")
              $B.js_this = this;
              ;$locals.$line_info = "91,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              var $right509 = $B.$getattr($B.$iter($B.fast_tuple([$B.$getattr($locals["self"],"C"),$B.$getattr($locals["self"],"stats")])), "__next__");
              var $rlist510=[], $pos=0;while(1){
                try{
                  $rlist510[$pos++] = $right509()}catch(err){
                    break}
                  }
                  if($rlist510.length<2){
                    throw _b_.ValueError.$factory("need more than " +$rlist510.length + " value" + ($rlist510.length > 1 ? "s" : "") + " to unpack")
                  }
                  if($rlist510.length>2){
                    throw _b_.ValueError.$factory("too many values to unpack (expected 2)")
                  }
                  ;$locals.$line_info = "91,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  $locals___main___UCT_374_run_simulation_380["C"] = $rlist510[0];
                  ;$locals.$line_info = "91,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  $locals___main___UCT_374_run_simulation_380["stats"] = $rlist510[1];
                  ;$locals.$line_info = "93,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  $locals___main___UCT_374_run_simulation_380["visited_states"] = $B.$list([]);
                  ;$locals.$line_info = "94,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  $locals___main___UCT_374_run_simulation_380["history_copy"] = $B.getitem_slice($B.$getattr($locals["self"],"history"), _b_.slice.$factory(_b_.None,_b_.None));
                  ;$locals.$line_info = "95,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  $locals___main___UCT_374_run_simulation_380["state"] = $B.$getitem($locals["history_copy"],-1);
                  ;$locals.$line_info = "97,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  $locals___main___UCT_374_run_simulation_380["expand"] = _b_.True;
                  ;$locals.$line_info = "98,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  var $no_break491 = true
                  var $next_func_400 = $B.next_of($B.$call(_b_.range)(1, $B.add($B.$getattr($locals["self"],"max_actions"), 1)))
                  while(true){
                    try{
                      var $next_400 = $next_func_400()
                    }catch(err){
                      if($B.is_exc(err, [_b_.StopIteration])){
                        break
                      }else{
                        $B.leave_frame({$locals, value: _b_.None});throw err
                      }
                    }
                    $locals___main___UCT_374_run_simulation_380["t"] = $next_400
                    
                    ;$locals.$line_info = "99,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                    
                    $locals___main___UCT_374_run_simulation_380["legal"] = $B.$call($B.$getattr($B.$getattr($locals["self"],"board"),"legal_actions"))($locals["state"]);
                    
                    ;$locals.$line_info = "100,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                    
                    $locals___main___UCT_374_run_simulation_380["actions_states"] = (function(expr){var $locals_listcomp381 = {},
                    $locals = $locals_listcomp381
                    $locals.$line_info = '100,__main__'
                    $locals.$comp_code = {
                      co_argcount: 1,
                      co_firstlineno:100,
                      co_name: "<listcomp>",
                      co_flags: 83,
                      co_freevars: $B.fast_tuple([]),
                      co_kwonlyargcount: 0,
                      co_posonlyargount: 0,
                      co_varnames: $B.fast_tuple(['.0', 'a'])
                    }
                    $locals['.0'] = expr
                    var $top_frame = ["listcomp381", $locals_listcomp381, "__main__", $locals___main__]
                    $locals.$f_trace = $B.enter_frame($top_frame)
                    var $result_listcomp381 = []
                    var $next_func_401 = $B.next_of(expr)
                    while(true){
                      try{
                        var $next_401 = $next_func_401()
                      }catch(err){
                        if($B.is_exc(err, [_b_.StopIteration])){
                          break
                        }else{
                          $B.leave_frame({$locals, value: _b_.None});throw err
                        }
                      }
                      $locals_listcomp381["a"] = $next_401
                      
                      try{
                        $result_listcomp381.push($B.fast_tuple([$B.$local_search('a'),$B.$call($B.$getattr($B.$getattr($B.$check_def_free("self",$locals___main___UCT_374_run_simulation_380["self"]),"board"),"next_state"))($B.$check_def_free("history_copy",$locals___main___UCT_374_run_simulation_380["history_copy"]), $B.$local_search('a'))]))
                      }catch(err){
                        $B.leave_frame($locals); throw err
                      }
                    }
                    $B.leave_frame({$locals, value: _b_.None})
                    return $result_listcomp381
                  }
                  )($B.$check_def_free("legal",$locals___main___UCT_374_run_simulation_380["legal"]));
                  
                  ;$locals.$line_info = "102,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  
                  if($B.$bool($B.$test_expr($B.$test_item($locals["expand"])&&$B.$test_item(!$B.$bool($B.$call(_b_.all)((function(expr){
                    var $locals_genexpr382 = {},
                        $locals = $locals_genexpr382
                    $locals.$line_info = '102,__main__'
                    $locals.$comp_code = {
                      co_argcount: 1,
                      co_firstlineno:102,
                      co_name: "<genexpr>",
                      co_flags: 115,
                      co_freevars: $B.fast_tuple([]),
                      co_kwonlyargcount: 0,
                      co_posonlyargount: 0,
                      co_varnames: $B.fast_tuple(['.0', 'a', 'S'])
                    }
                    $locals['.0'] = expr
                    
                    var $top_frame = ["genexpr382", $locals_genexpr382, "__main__", $locals___main__]
                    $locals.$f_trace = $B.enter_frame($top_frame)
                    var genexpr382 = function*(expr){
                      var $top_frame = ["genexpr382", $locals_genexpr382, "__main__", $locals___main__]
                      $locals.$f_trace = $B.enter_frame($top_frame)
                      var $next_func_402 = $B.next_of(expr)
                      while(true){
                        try{
                          var $next_402 = $next_func_402()
                        }catch(err){
                          if($B.is_exc(err, [_b_.StopIteration])){
                            break
                          }else{
                            $B.leave_frame({$locals, value: _b_.None});throw err
                          }
                        }
                        try{
                          var $next_403 = $B.unpacker($next_402, 2, false, undefined)
                        }catch(err){
                          console.log("erreur");$B.leave_frame($locals); throw err
                        }
                        $locals_genexpr382["a"] = $next_403.read_one()
                        $locals_genexpr382["S"] = $next_403.read_one()
                        
                        
                        try{
                          var result = $B.$is_member($B.$local_search('S'),$B.$check_def_free("stats",$locals___main___UCT_374_run_simulation_380["stats"]))
                        }catch(err){
                          
                          $B.leave_frame($locals)
                          throw err
                        }
                        
                        try{
                          $B.leave_frame($locals)
                          yield result
                          $B.frames_stack.push($top_frame)
                        }catch(err1){
                          $B.frames_stack.push($top_frame)
                          throw err1
                        }
                      }
                      $B.leave_frame($locals)
                    }
                    $B.leave_frame($locals)
                    return $B.generator.$factory(genexpr382)(expr)
                  }
                  )($B.$check_def_free("actions_states",$locals___main___UCT_374_run_simulation_380["actions_states"])))))))){
                    ;$locals.$line_info = "103,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                    $B.$call($B.$getattr($locals["stats"],"update"))((function(expr){
                      var $locals_genexpr383 = {},
                          $locals = $locals_genexpr383
                      $locals.$line_info = '103,__main__'
                      $locals.$comp_code = {
                        co_argcount: 1,
                        co_firstlineno:103,
                        co_name: "<genexpr>",
                        co_flags: 115,
                        co_freevars: $B.fast_tuple([]),
                        co_kwonlyargcount: 0,
                        co_posonlyargount: 0,
                        co_varnames: $B.fast_tuple(['.0', 'a', 'S'])
                      }
                      $locals['.0'] = expr
                      
                      var $top_frame = ["genexpr383", $locals_genexpr383, "__main__", $locals___main__]
                      $locals.$f_trace = $B.enter_frame($top_frame)
                      var genexpr383 = function*(expr){
                        var $top_frame = ["genexpr383", $locals_genexpr383, "__main__", $locals___main__]
                        $locals.$f_trace = $B.enter_frame($top_frame)
                        var $next_func_404 = $B.next_of(expr)
                        while(true){
                          try{
                            var $next_404 = $next_func_404()
                          }catch(err){
                            if($B.is_exc(err, [_b_.StopIteration])){
                              break
                            }else{
                              $B.leave_frame({$locals, value: _b_.None});throw err
                            }
                          }
                          try{
                            var $next_405 = $B.unpacker($next_404, 2, false, undefined)
                          }catch(err){
                            console.log("erreur");$B.leave_frame($locals); throw err
                          }
                          $locals_genexpr383["a"] = $next_405.read_one()
                          $locals_genexpr383["S"] = $next_405.read_one()
                          
                          
                          if($B.$bool(!$B.$is_member($B.$local_search('S'),$B.$check_def_free("stats",$locals___main___UCT_374_run_simulation_380["stats"])))){
                            try{
                              var result = $B.fast_tuple([$B.$local_search('S'),$B.$call($locals___main__["Stat"])()])
                            }catch(err){
                              
                              $B.leave_frame($locals)
                              throw err
                            }
                            
                            try{
                              $B.leave_frame($locals)
                              yield result
                              $B.frames_stack.push($top_frame)
                            }catch(err1){
                              $B.frames_stack.push($top_frame)
                              throw err1
                            }
                          }
                        }
                        $B.leave_frame($locals)
                      }
                      $B.leave_frame($locals)
                      return $B.generator.$factory(genexpr383)(expr)
                    }
                    )($B.$check_def_free("actions_states",$locals___main___UCT_374_run_simulation_380["actions_states"])));
                    ;$locals.$line_info = "104,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                    $locals___main___UCT_374_run_simulation_380["expand"] = _b_.False;
                    ;$locals.$line_info = "105,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                    if($B.$bool($B.rich_comp("__gt__",$locals["t"],$B.$getattr($locals["self"],"max_depth")))){
                      ;$locals.$line_info = "106,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                      $B.$setattr($locals["self"],"max_depth",$locals["t"]);_b_.None;;
                    }
                  }
                  
                  ;$locals.$line_info = "108,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  
                  if($B.$bool($locals["expand"])){
                    ;$locals.$line_info = "110,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                    $locals___main___UCT_374_run_simulation_380["actions_states"] = (function(expr){var $locals_listcomp384 = {},
                    $locals = $locals_listcomp384
                    $locals.$line_info = '110,__main__'
                    $locals.$comp_code = {
                      co_argcount: 1,
                      co_firstlineno:110,
                      co_name: "<listcomp>",
                      co_flags: 83,
                      co_freevars: $B.fast_tuple([]),
                      co_kwonlyargcount: 0,
                      co_posonlyargount: 0,
                      co_varnames: $B.fast_tuple(['.0', 'a', 'S'])
                    }
                    $locals['.0'] = expr
                    var $top_frame = ["listcomp384", $locals_listcomp384, "__main__", $locals___main__]
                    $locals.$f_trace = $B.enter_frame($top_frame)
                    var $result_listcomp384 = []
                    var $next_func_406 = $B.next_of(expr)
                    while(true){
                      try{
                        var $next_406 = $next_func_406()
                      }catch(err){
                        if($B.is_exc(err, [_b_.StopIteration])){
                          break
                        }else{
                          $B.leave_frame({$locals, value: _b_.None});throw err
                        }
                      }
                      try{
                        var $next_407 = $B.unpacker($next_406, 2, false, undefined)
                      }catch(err){
                        console.log("erreur");$B.leave_frame($locals); throw err
                      }
                      $locals_listcomp384["a"] = $next_407.read_one()
                      $locals_listcomp384["S"] = $next_407.read_one()
                      
                      
                      try{
                        $result_listcomp384.push($B.fast_tuple([$B.$local_search('a'),$B.$local_search('S'),$B.$getitem($B.$check_def_free("stats",$locals___main___UCT_374_run_simulation_380["stats"]),$B.$local_search('S'))]))
                      }catch(err){
                        $B.leave_frame($locals); throw err
                      }
                    }
                    $B.leave_frame({$locals, value: _b_.None})
                    return $result_listcomp384
                  }
                  )($B.$check_def_free("actions_states",$locals___main___UCT_374_run_simulation_380["actions_states"]));
                  ;$locals.$line_info = "111,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  $locals___main___UCT_374_run_simulation_380["log_total"] = $B.$call($B.$global_search("log", ["__main___UCT_374_run_simulation_380", "__main__"]))($B.$test_expr($B.$test_item($B.$call(_b_.sum)((function(expr){
                    var $locals_genexpr385 = {},
                        $locals = $locals_genexpr385
                    $locals.$line_info = '111,__main__'
                    $locals.$comp_code = {
                      co_argcount: 1,
                      co_firstlineno:111,
                      co_name: "<genexpr>",
                      co_flags: 115,
                      co_freevars: $B.fast_tuple([]),
                      co_kwonlyargcount: 0,
                      co_posonlyargount: 0,
                      co_varnames: $B.fast_tuple(['.0', 'a', 'S', 'e'])
                    }
                    $locals['.0'] = expr
                    
                    var $top_frame = ["genexpr385", $locals_genexpr385, "__main__", $locals___main__]
                    $locals.$f_trace = $B.enter_frame($top_frame)
                    var genexpr385 = function*(expr){
                      var $top_frame = ["genexpr385", $locals_genexpr385, "__main__", $locals___main__]
                      $locals.$f_trace = $B.enter_frame($top_frame)
                      var $next_func_408 = $B.next_of(expr)
                      while(true){
                        try{
                          var $next_408 = $next_func_408()
                        }catch(err){
                          if($B.is_exc(err, [_b_.StopIteration])){
                            break
                          }else{
                            $B.leave_frame({$locals, value: _b_.None});throw err
                          }
                        }
                        try{
                          var $next_409 = $B.unpacker($next_408, 3, false, undefined)
                        }catch(err){
                          console.log("erreur");$B.leave_frame($locals); throw err
                        }
                        $locals_genexpr385["a"] = $next_409.read_one()
                        $locals_genexpr385["S"] = $next_409.read_one()
                        $locals_genexpr385["e"] = $next_409.read_one()
                        
                        
                        try{
                          var result = $B.$getattr($B.$local_search('e'),"visits")
                        }catch(err){
                          
                          $B.leave_frame($locals)
                          throw err
                        }
                        
                        try{
                          $B.leave_frame($locals)
                          yield result
                          $B.frames_stack.push($top_frame)
                        }catch(err1){
                          $B.frames_stack.push($top_frame)
                          throw err1
                        }
                      }
                      $B.leave_frame($locals)
                    }
                    $B.leave_frame($locals)
                    return $B.generator.$factory(genexpr385)(expr)
                  }
                  )($B.$check_def_free("actions_states",$locals___main___UCT_374_run_simulation_380["actions_states"]))))||$B.$test_item(1)));
                  ;$locals.$line_info = "112,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  $locals___main___UCT_374_run_simulation_380["values_actions"] = (function(expr){var $locals_listcomp386 = {},
                  $locals = $locals_listcomp386
                  $locals.$line_info = '112,__main__'
                  $locals.$comp_code = {
                    co_argcount: 1,
                    co_firstlineno:112,
                    co_name: "<listcomp>",
                    co_flags: 83,
                    co_freevars: $B.fast_tuple([]),
                    co_kwonlyargcount: 0,
                    co_posonlyargount: 0,
                    co_varnames: $B.fast_tuple(['.0', 'a', 'S', 'e'])
                  }
                  $locals['.0'] = expr
                  var $top_frame = ["listcomp386", $locals_listcomp386, "__main__", $locals___main__]
                  $locals.$f_trace = $B.enter_frame($top_frame)
                  var $result_listcomp386 = []
                  var $next_func_410 = $B.next_of(expr)
                  while(true){
                    try{
                      var $next_410 = $next_func_410()
                    }catch(err){
                      if($B.is_exc(err, [_b_.StopIteration])){
                        break
                      }else{
                        $B.leave_frame({$locals, value: _b_.None});throw err
                      }
                    }
                    try{
                      var $next_411 = $B.unpacker($next_410, 3, false, undefined)
                    }catch(err){
                      console.log("erreur");$B.leave_frame($locals); throw err
                    }
                    $locals_listcomp386["a"] = $next_411.read_one()
                    $locals_listcomp386["S"] = $next_411.read_one()
                    $locals_listcomp386["e"] = $next_411.read_one()
                    
                    
                    try{
                      $result_listcomp386.push($B.fast_tuple([$B.$local_search('a'),$B.$local_search('S'),$B.add($B.rich_op("__truediv__", $B.$getattr($B.$local_search('e'),"value"), $B.$test_expr($B.$test_item($B.$getattr($B.$local_search('e'),"visits"))||$B.$test_item(1))), $B.rich_op("__mul__", $B.$check_def_free("C",$locals___main___UCT_374_run_simulation_380["C"]), $B.$call($B.$global_search("sqrt", ["listcomp386", "__main___UCT_374_run_simulation_380", "__main__"]))($B.rich_op("__truediv__", $B.$check_def_free("log_total",$locals___main___UCT_374_run_simulation_380["log_total"]), $B.$test_expr($B.$test_item($B.$getattr($B.$local_search('e'),"visits"))||$B.$test_item(1))))))]))
                    }catch(err){
                      $B.leave_frame($locals); throw err
                    }
                  }
                  $B.leave_frame({$locals, value: _b_.None})
                  return $result_listcomp386
                }
                )($B.$check_def_free("actions_states",$locals___main___UCT_374_run_simulation_380["actions_states"]));
                ;$locals.$line_info = "116,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                $locals___main___UCT_374_run_simulation_380["max_value"] = $B.$call(_b_.max)((function(expr){
                  var $locals_genexpr387 = {},
                      $locals = $locals_genexpr387
                  $locals.$line_info = '116,__main__'
                  $locals.$comp_code = {
                    co_argcount: 1,
                    co_firstlineno:116,
                    co_name: "<genexpr>",
                    co_flags: 115,
                    co_freevars: $B.fast_tuple([]),
                    co_kwonlyargcount: 0,
                    co_posonlyargount: 0,
                    co_varnames: $B.fast_tuple(['.0', '_', 'v'])
                  }
                  $locals['.0'] = expr
                  
                  var $top_frame = ["genexpr387", $locals_genexpr387, "__main__", $locals___main__]
                  $locals.$f_trace = $B.enter_frame($top_frame)
                  var genexpr387 = function*(expr){
                    var $top_frame = ["genexpr387", $locals_genexpr387, "__main__", $locals___main__]
                    $locals.$f_trace = $B.enter_frame($top_frame)
                    var $next_func_412 = $B.next_of(expr)
                    while(true){
                      try{
                        var $next_412 = $next_func_412()
                      }catch(err){
                        if($B.is_exc(err, [_b_.StopIteration])){
                          break
                        }else{
                          $B.leave_frame({$locals, value: _b_.None});throw err
                        }
                      }
                      try{
                        var $next_413 = $B.unpacker($next_412, 3, false, undefined)
                      }catch(err){
                        console.log("erreur");$B.leave_frame($locals); throw err
                      }
                      $locals_genexpr387["_"] = $next_413.read_one()
                      $locals_genexpr387["_"] = $next_413.read_one()
                      $locals_genexpr387["v"] = $next_413.read_one()
                      
                      
                      try{
                        var result = $B.$local_search('v')
                      }catch(err){
                        
                        $B.leave_frame($locals)
                        throw err
                      }
                      
                      try{
                        $B.leave_frame($locals)
                        yield result
                        $B.frames_stack.push($top_frame)
                      }catch(err1){
                        $B.frames_stack.push($top_frame)
                        throw err1
                      }
                    }
                    $B.leave_frame($locals)
                  }
                  $B.leave_frame($locals)
                  return $B.generator.$factory(genexpr387)(expr)
                }
                )($B.$check_def_free("values_actions",$locals___main___UCT_374_run_simulation_380["values_actions"])));
                ;$locals.$line_info = "118,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                $locals___main___UCT_374_run_simulation_380["actions_states"] = (function(expr){var $locals_listcomp388 = {},
                $locals = $locals_listcomp388
                $locals.$line_info = '118,__main__'
                $locals.$comp_code = {
                  co_argcount: 1,
                  co_firstlineno:118,
                  co_name: "<listcomp>",
                  co_flags: 83,
                  co_freevars: $B.fast_tuple([]),
                  co_kwonlyargcount: 0,
                  co_posonlyargount: 0,
                  co_varnames: $B.fast_tuple(['.0', 'a', 'S', 'v'])
                }
                $locals['.0'] = expr
                var $top_frame = ["listcomp388", $locals_listcomp388, "__main__", $locals___main__]
                $locals.$f_trace = $B.enter_frame($top_frame)
                var $result_listcomp388 = []
                var $next_func_414 = $B.next_of(expr)
                while(true){
                  try{
                    var $next_414 = $next_func_414()
                  }catch(err){
                    if($B.is_exc(err, [_b_.StopIteration])){
                      break
                    }else{
                      $B.leave_frame({$locals, value: _b_.None});throw err
                    }
                  }
                  try{
                    var $next_415 = $B.unpacker($next_414, 3, false, undefined)
                  }catch(err){
                    console.log("erreur");$B.leave_frame($locals); throw err
                  }
                  $locals_listcomp388["a"] = $next_415.read_one()
                  $locals_listcomp388["S"] = $next_415.read_one()
                  $locals_listcomp388["v"] = $next_415.read_one()
                  
                  
                  if($B.$bool(typeof $B.$local_search('v')!="object" && typeof $B.$local_search('v')!="function" && typeof $B.$local_search('v') == typeof $B.$check_def_free("max_value",$locals___main___UCT_374_run_simulation_380["max_value"]) ? $B.$local_search('v')==$B.$check_def_free("max_value",$locals___main___UCT_374_run_simulation_380["max_value"]) : $B.rich_comp("__eq__",$B.$local_search('v'),$B.$check_def_free("max_value",$locals___main___UCT_374_run_simulation_380["max_value"])))){
                    try{
                      $result_listcomp388.push($B.fast_tuple([$B.$local_search('a'),$B.$local_search('S')]))
                    }catch(err){
                      $B.leave_frame($locals); throw err
                    }
                  }
                }
                $B.leave_frame({$locals, value: _b_.None})
                return $result_listcomp388
              }
              )($B.$check_def_free("values_actions",$locals___main___UCT_374_run_simulation_380["values_actions"]));
            }
            
            ;$locals.$line_info = "120,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            
            var $right512 = $B.$getattr($B.$iter($B.$call($B.$global_search("choice", ["__main___UCT_374_run_simulation_380", "__main__"]))($locals["actions_states"])), "__next__");
            
            var $rlist513=[], $pos=0;while(1){
              try{
                $rlist513[$pos++] = $right512()}catch(err){
                  break}
                }
                
                if($rlist513.length<2){
                  throw _b_.ValueError.$factory("need more than " +$rlist513.length + " value" + ($rlist513.length > 1 ? "s" : "") + " to unpack")
                }
                
                if($rlist513.length>2){
                  throw _b_.ValueError.$factory("too many values to unpack (expected 2)")
                }
                
                ;$locals.$line_info = "120,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                
                $locals___main___UCT_374_run_simulation_380["action"] = $rlist513[0];
                
                ;$locals.$line_info = "120,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                
                $locals___main___UCT_374_run_simulation_380["state"] = $rlist513[1];
                
                ;$locals.$line_info = "121,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                
                $B.$call($B.$getattr($locals["visited_states"],"append"))($locals["state"]);
                
                ;$locals.$line_info = "122,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                
                $B.$call($B.$getattr($locals["history_copy"],"append"))($locals["state"]);
                
                ;$locals.$line_info = "124,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                
                if($B.$bool($B.$call($B.$getattr($B.$getattr($locals["self"],"board"),"is_ended"))($locals["state"]))){
                  ;$locals.$line_info = "125,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  ;$no_break491 = false;break;
                }
                ;$locals.$line_info = "98,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              }
              
              ;$locals.$line_info = "128,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              $locals___main___UCT_374_run_simulation_380["end_values"] = $B.$call($B.$getattr($locals["self"],"end_values"))($locals["state"]);
              ;$locals.$line_info = "129,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              var $no_break500 = true
              var $next_func_416 = $B.next_of($locals["visited_states"])
              while(true){
                try{
                  var $next_416 = $next_func_416()
                }catch(err){
                  if($B.is_exc(err, [_b_.StopIteration])){
                    break
                  }else{
                    $B.leave_frame({$locals, value: _b_.None});throw err
                  }
                }
                $locals___main___UCT_374_run_simulation_380["state"] = $next_416
                
                ;$locals.$line_info = "130,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                
                if($B.$bool(!$B.$is_member($locals["state"],$locals["stats"]))){
                  ;$locals.$line_info = "131,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  continue;
                }
                
                ;$locals.$line_info = "132,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                
                $locals___main___UCT_374_run_simulation_380["S"] = $B.$getitem($locals["stats"],$locals["state"]);
                
                ;$locals.$line_info = "133,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                
                $B.$setattr(($locals.$tg = $locals["S"]), 'visits', $B.augm_assign($B.$getattr($locals.$tg, 'visits'), '+=', 1));
                
                ;$locals.$line_info = "134,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                
                $B.$setattr(($locals.$tg = $locals["S"]), 'value', $B.augm_assign($B.$getattr($locals.$tg, 'value'), '+=', $B.$getitem($locals["end_values"],$B.$call($B.$getattr($B.$getattr($locals["self"],"board"),"previous_player"))($locals["state"]))));
                ;$locals.$line_info = "129,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              }
              
              if($locals.$f_trace !== _b_.None){
                $B.trace_return(_b_.None)
              }
              $B.leave_frame({$locals});return _b_.None
            }catch(err){
              $B.set_exc(err)
              if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
                $locals.$f_trace = $B.trace_exception()
              }
              $B.leave_frame({$locals});throw err
            }
          }
          run_simulation490.$is_func = true
          run_simulation490.$infos = {
            __name__:"run_simulation",
            __qualname__:"UCT.run_simulation",
            __defaults__ : _b_.None,
            __kwdefaults__ : _b_.None,
            __annotations__: {},
            __dict__: $B.empty_dict(),
            __doc__: _b_.None,
            __module__ : "__main__",
            __code__:{
              co_argcount:1,
              co_filename:$locals___main__["__file__"] || "<string>",
              co_firstlineno:85,
              co_flags:67,
              co_freevars: ["a","Stat","False","log","e","sqrt","v","choice"],
              co_kwonlyargcount:0,
              co_name: "run_simulation",
              co_nlocals: 16,
              co_posonlyargcount: 0,
              co_varnames: $B.fast_tuple(["self", "C", "stats", "visited_states", "history_copy", "state", "expand", "t", "legal", "actions_states", "log_total", "values_actions", "max_value", "action", "end_values", "S"])
            }
          };_b_.None;
          return run_simulation490
        }
        $locals___main___UCT_374["run_simulation"] = run_simulation$490({})
        $locals___main___UCT_374["run_simulation"].$set_defaults = function(value){
          return $locals___main___UCT_374["run_simulation"] = run_simulation$490(value)
        }
        if($locals.$f_trace !== _b_.None){
          $B.trace_return(_b_.None)
        }
        $B.leave_frame({$locals})
        return $locals___main___UCT_374;
      }
      )();
      $UCT_374.__module__ = $locals___main__.__name__
      ;$locals___main__["UCT"] = $B.$class_constructor("UCT", $UCT_374, _b_.tuple.$factory([_b_.object]),["_b_.object"],[])
      ;$locals___main__["UCT"].__doc__ = _b_.None;
      _b_.None;
      ;$locals.$line_info = "137,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
      var $UCTWins_389 = (function(){
        var $locals___main___UCTWins_389 = {__annotations__: $B.empty_dict()},
            $locals = $locals___main___UCTWins_389
        $locals.$name = "UCTWins"
        $locals.$qualname = "UCTWins"
        $locals.$is_class = true;
        $locals.$line_info = "137,__main__";
        var $top_frame = ["$locals___main___UCTWins_389", $locals,"__main__", $locals___main__]
        $locals.$f_trace = $B.enter_frame($top_frame);
        if($locals.$f_trace !== _b_.None){
          $locals.$f_trace = $B.trace_line()
        }
        ;$locals.$line_info = "138,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
        $locals___main___UCTWins_389["name"] = $B.String("jrb.mcts.uct");
        ;$locals.$line_info = "139,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
        $locals___main___UCTWins_389["action_template"] = $B.String("{action}: {percent:.2f}% ({wins} / {plays})");
        ;$locals.$line_info = "141,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
        var __init__$501 = function($defaults){
          function __init__501(){
            var $locals___main___UCTWins_389___init___390 = {},
                $locals = $locals___main___UCTWins_389___init___390;
            $locals___main___UCTWins_389___init___390 = $locals = $B.args("__init__", 2, {"self":null, "board":null}, ["self", "board"], arguments, $defaults, null, "kwargs");
            $locals.$line_info = "141,__main__"
            var $top_frame = ["__main___UCTWins_389___init___390", $locals,"__main__", $locals___main__, __init__501]
            $locals.$f_trace = $B.enter_frame($top_frame)
            var $stack_length = $B.frames_stack.length;
            try{
              $locals.__class__ = $B.get_method_class($locals___main__, "UCTWins")
              $B.js_this = this;
              ;$locals.$line_info = "142,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              $B.$call($B.$getattr($B.$call(_b_.super)($locals___main__["UCTWins"], $locals["self"]),"__init__"))($locals["board"],{$nat:"kw",kw:[{},$locals["kwargs"]]});
              ;$locals.$line_info = "143,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              $B.$setattr($locals["self"],"end_values",$B.$getattr($locals["board"],"win_values"));_b_.None;;
              if($locals.$f_trace !== _b_.None){
                $B.trace_return(_b_.None)
              }
              $B.leave_frame({$locals});return _b_.None
            }catch(err){
              $B.set_exc(err)
              if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
                $locals.$f_trace = $B.trace_exception()
              }
              $B.leave_frame({$locals});throw err
            }
          }
          __init__501.$is_func = true
          __init__501.$infos = {
            __name__:"__init__",
            __qualname__:"UCTWins.__init__",
            __defaults__ : _b_.None,
            __kwdefaults__ : _b_.None,
            __annotations__: {},
            __dict__: $B.empty_dict(),
            __doc__: _b_.None,
            __module__ : "__main__",
            __code__:{
              co_argcount:2,
              co_filename:$locals___main__["__file__"] || "<string>",
              co_firstlineno:141,
              co_flags:75,
              co_freevars: ["UCTWins"],
              co_kwonlyargcount:0,
              co_name: "__init__",
              co_nlocals: 3,
              co_posonlyargcount: 0,
              co_varnames: $B.fast_tuple(["self", "board", "kwargs"])
            }
          };_b_.None;
          return __init__501
        }
        $locals___main___UCTWins_389["__init__"] = __init__$501({})
        $locals___main___UCTWins_389["__init__"].$set_defaults = function(value){
          return $locals___main___UCTWins_389["__init__"] = __init__$501(value)
        }
        ;$locals.$line_info = "145,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
        var calculate_action_values$502 = function($defaults){
          function calculate_action_values502(_self, _history, _player, _legal){
            var $locals___main___UCTWins_389_calculate_action_values_391 = {},
                $locals = $locals___main___UCTWins_389_calculate_action_values_391;
            var $len = arguments.length;
            var last_arg;if($len > 0 && ((last_arg = arguments[$len - 1]) !== undefined) && last_arg.$nat !== undefined){
              $locals___main___UCTWins_389_calculate_action_values_391 = $locals = $B.args("calculate_action_values", 4, {"self":null, "history":null, "player":null, "legal":null}, ["self", "history", "player", "legal"], arguments, $defaults, null, null);
            }else{
              if($len == 4){
                $locals___main___UCTWins_389_calculate_action_values_391 = $locals = $B.conv_undef({"self": _self, "history": _history, "player": _player, "legal": _legal})
              }else if($len > 4){
                $B.wrong_nb_args("calculate_action_values", $len, 4, ["self","history","player","legal"])
              }else if($len + Object.keys($defaults).length < 4){
                $B.wrong_nb_args("calculate_action_values", $len, 4, ["self","history","player","legal"])
              }else{
                $locals___main___UCTWins_389_calculate_action_values_391 = $locals = $B.conv_undef({"self": _self, "history": _history, "player": _player, "legal": _legal})
                var defparams = ["self","history","player","legal"]
                for(var i = $len; i < defparams.length; i++){
                  $locals[defparams[i]] = $defaults[defparams[i]]
                }
              }
            }
            $locals.$line_info = "145,__main__"
            var $top_frame = ["__main___UCTWins_389_calculate_action_values_391", $locals,"__main__", $locals___main__, calculate_action_values502]
            $locals.$f_trace = $B.enter_frame($top_frame)
            var $stack_length = $B.frames_stack.length;
            try{
              $locals.__class__ = $B.get_method_class($locals___main__, "UCTWins")
              $B.js_this = this;
              ;$locals.$line_info = "146,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              $locals___main___UCTWins_389_calculate_action_values_391["actions_states"] = (function(expr){
                var $locals_genexpr392 = {},
                    $locals = $locals_genexpr392
                $locals.$line_info = '146,__main__'
                $locals.$comp_code = {
                  co_argcount: 1,
                  co_firstlineno:146,
                  co_name: "<genexpr>",
                  co_flags: 115,
                  co_freevars: $B.fast_tuple([]),
                  co_kwonlyargcount: 0,
                  co_posonlyargount: 0,
                  co_varnames: $B.fast_tuple(['.0', 'a'])
                }
                $locals['.0'] = expr
                
                var $top_frame = ["genexpr392", $locals_genexpr392, "__main__", $locals___main__]
                $locals.$f_trace = $B.enter_frame($top_frame)
                var genexpr392 = function*(expr){
                  var $top_frame = ["genexpr392", $locals_genexpr392, "__main__", $locals___main__]
                  $locals.$f_trace = $B.enter_frame($top_frame)
                  var $next_func_417 = $B.next_of(expr)
                  while(true){
                    try{
                      var $next_417 = $next_func_417()
                    }catch(err){
                      if($B.is_exc(err, [_b_.StopIteration])){
                        break
                      }else{
                        $B.leave_frame({$locals, value: _b_.None});throw err
                      }
                    }
                    $locals_genexpr392["a"] = $next_417
                    
                    try{
                      var result = $B.fast_tuple([$B.$local_search('a'),$B.$call($B.$getattr($B.$getattr($B.$check_def_free("self",$locals___main___UCTWins_389_calculate_action_values_391["self"]),"board"),"next_state"))($B.$check_def_free("history",$locals___main___UCTWins_389_calculate_action_values_391["history"]), $B.$local_search('a'))])
                    }catch(err){
                      
                      $B.leave_frame($locals)
                      throw err
                    }
                    
                    try{
                      $B.leave_frame($locals)
                      yield result
                      $B.frames_stack.push($top_frame)
                    }catch(err1){
                      $B.frames_stack.push($top_frame)
                      throw err1
                    }
                  }
                  $B.leave_frame($locals)
                }
                $B.leave_frame($locals)
                return $B.generator.$factory(genexpr392)(expr)
              }
              )($B.$check_def_free("legal",$locals___main___UCTWins_389_calculate_action_values_391["legal"]));
              ;$locals.$line_info = "147,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
              var $res = $B.$call(_b_.sorted)((function(expr){
                var $locals_genexpr393 = {},
                    $locals = $locals_genexpr393
                $locals.$line_info = '147,__main__'
                $locals.$comp_code = {
                  co_argcount: 1,
                  co_firstlineno:147,
                  co_name: "<genexpr>",
                  co_flags: 115,
                  co_freevars: $B.fast_tuple([]),
                  co_kwonlyargcount: 0,
                  co_posonlyargount: 0,
                  co_varnames: $B.fast_tuple(['.0', 'a', 'S'])
                }
                $locals['.0'] = expr
                
                var $top_frame = ["genexpr393", $locals_genexpr393, "__main__", $locals___main__]
                $locals.$f_trace = $B.enter_frame($top_frame)
                var genexpr393 = function*(expr){
                  var $top_frame = ["genexpr393", $locals_genexpr393, "__main__", $locals___main__]
                  $locals.$f_trace = $B.enter_frame($top_frame)
                  var $next_func_418 = $B.next_of(expr)
                  while(true){
                    try{
                      var $next_418 = $next_func_418()
                    }catch(err){
                      if($B.is_exc(err, [_b_.StopIteration])){
                        break
                      }else{
                        $B.leave_frame({$locals, value: _b_.None});throw err
                      }
                    }
                    try{
                      var $next_419 = $B.unpacker($next_418, 2, false, undefined)
                    }catch(err){
                      console.log("erreur");$B.leave_frame($locals); throw err
                    }
                    $locals_genexpr393["a"] = $next_419.read_one()
                    $locals_genexpr393["S"] = $next_419.read_one()
                    
                    
                    try{
                      var result = _b_.dict.$factory([[$B.String('action'),$B.$local_search('a')],[$B.String('percent'),$B.rich_op("__truediv__", $B.rich_op("__mul__", 100, $B.$getattr($B.$getitem($B.$getattr($B.$check_def_free("self",$locals___main___UCTWins_389_calculate_action_values_391["self"]),"stats"),$B.$local_search('S')),"value")), $B.$test_expr($B.$test_item($B.$getattr($B.$getitem($B.$getattr($B.$check_def_free("self",$locals___main___UCTWins_389_calculate_action_values_391["self"]),"stats"),$B.$local_search('S')),"visits"))||$B.$test_item(1)))],[$B.String('wins'),$B.$getattr($B.$getitem($B.$getattr($B.$check_def_free("self",$locals___main___UCTWins_389_calculate_action_values_391["self"]),"stats"),$B.$local_search('S')),"value")],[$B.String('plays'),$B.$getattr($B.$getitem($B.$getattr($B.$check_def_free("self",$locals___main___UCTWins_389_calculate_action_values_391["self"]),"stats"),$B.$local_search('S')),"visits")]])
                    }catch(err){
                      
                      $B.leave_frame($locals)
                      throw err
                    }
                    
                    try{
                      $B.leave_frame($locals)
                      yield result
                      $B.frames_stack.push($top_frame)
                    }catch(err1){
                      $B.frames_stack.push($top_frame)
                      throw err1
                    }
                  }
                  $B.leave_frame($locals)
                }
                $B.leave_frame($locals)
                return $B.generator.$factory(genexpr393)(expr)
              }
              )($B.$check_def_free("actions_states",$locals___main___UCTWins_389_calculate_action_values_391["actions_states"])),{$nat:"kw",kw:{key:(function($locals_lambda420){
                var $B = __BRYTHON__,
                    _b_ = __BRYTHON__.builtins,
                    $locals = $locals_lambda420;
                
                $locals_lambda420.__package__ = ""
                $locals.__annotations__ = $B.empty_dict()
                var $top_frame = ["lambda420", $locals_lambda420, "__main__", $locals___main__]
                $locals.$f_trace = $B.enter_frame($top_frame)
                var $stack_length = $B.frames_stack.length;
                try{
                  ;$locals.$line_info = "147,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                  var lambda_4ynw589e_420$530 = function($defaults){
                    function lambda_4ynw589e_420530(_x){
                      var $locals_lambda420_lambda_4ynw589e_420_421 = {},
                          $locals = $locals_lambda420_lambda_4ynw589e_420_421;
                      var $len = arguments.length;
                      var last_arg;if($len > 0 && ((last_arg = arguments[$len - 1]) !== undefined) && last_arg.$nat !== undefined){
                        $locals_lambda420_lambda_4ynw589e_420_421 = $locals = $B.args("lambda_4ynw589e_420", 1, {"x":null}, ["x"], arguments, $defaults, null, null);
                      }else{
                        if($len == 1){
                          $locals_lambda420_lambda_4ynw589e_420_421 = $locals = $B.conv_undef({"x": _x})
                        }else if($len > 1){
                          $B.wrong_nb_args("lambda_4ynw589e_420", $len, 1, ["x"])
                        }else if($len + Object.keys($defaults).length < 1){
                          $B.wrong_nb_args("lambda_4ynw589e_420", $len, 1, ["x"])
                        }else{
                          $locals_lambda420_lambda_4ynw589e_420_421 = $locals = $B.conv_undef({"x": _x})
                          var defparams = ["x"]
                          for(var i = $len; i < defparams.length; i++){
                            $locals[defparams[i]] = $defaults[defparams[i]]
                          }
                        }
                      }
                      $locals.$line_info = "147,__main__"
                      var $top_frame = ["lambda420_lambda_4ynw589e_420_421", $locals,"__main__", $locals___main__, lambda_4ynw589e_420530]
                      $locals.$f_trace = $B.enter_frame($top_frame)
                      var $stack_length = $B.frames_stack.length;
                      try{
                        $B.js_this = this;
                        ;$locals.$line_info = "2,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                        var $res = $B.fast_tuple([$B.$getitem($locals["x"],$B.String('percent')),$B.$getitem($locals["x"],$B.String('plays'))]);
                        if($locals.$f_trace !== _b_.None){
                          $B.trace_return($res)
                        }
                        $B.leave_frame({$locals});
                        return $res;
                      }catch(err){
                        $B.set_exc(err)
                        if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
                          $locals.$f_trace = $B.trace_exception()
                        }
                        $B.leave_frame({$locals});throw err
                      }
                    }
                    lambda_4ynw589e_420530.$is_func = true
                    lambda_4ynw589e_420530.$infos = {
                      __name__:"<lambda>",
                      __qualname__:"<lambda>",
                      __defaults__ : _b_.None,
                      __kwdefaults__ : _b_.None,
                      __annotations__: {},
                      __dict__: $B.empty_dict(),
                      __doc__: _b_.None,
                      __module__ : "__main__",
                      __code__:{
                        co_argcount:1,
                        co_filename:$locals___main__["__file__"] || "<string>",
                        co_firstlineno:147,
                        co_flags:67,
                        co_freevars: [],
                        co_kwonlyargcount:0,
                        co_name: "<lambda>",
                        co_nlocals: 1,
                        co_posonlyargcount: 0,
                        co_varnames: $B.fast_tuple(["x"])
                      }
                    };_b_.None;
                    return lambda_4ynw589e_420530
                  }
                  $locals_lambda420["lambda_4ynw589e_420"] = lambda_4ynw589e_420$530({})
                  $locals_lambda420["lambda_4ynw589e_420"].$set_defaults = function(value){
                    return $locals_lambda420["lambda_4ynw589e_420"] = lambda_4ynw589e_420$530(value)
                  }
                  $B.leave_frame({$locals, value: _b_.None})
                }catch(err){
                  $B.leave_frame({$locals, value: _b_.None})
                  throw err
                }
                
                return $locals.lambda_4ynw589e_420})({}), reverse:_b_.True}});
                if($locals.$f_trace !== _b_.None){
                  $B.trace_return($res)
                }
                $B.leave_frame({$locals});
                return $res;
              }catch(err){
                $B.set_exc(err)
                if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
                  $locals.$f_trace = $B.trace_exception()
                }
                $B.leave_frame({$locals});throw err
              }
            }
            calculate_action_values502.$is_func = true
            calculate_action_values502.$infos = {
              __name__:"calculate_action_values",
              __qualname__:"UCTWins.calculate_action_values",
              __defaults__ : _b_.None,
              __kwdefaults__ : _b_.None,
              __annotations__: {},
              __dict__: $B.empty_dict(),
              __doc__: _b_.None,
              __module__ : "__main__",
              __code__:{
                co_argcount:4,
                co_filename:$locals___main__["__file__"] || "<string>",
                co_firstlineno:145,
                co_flags:67,
                co_freevars: ["a","S","key","x","reverse"],
                co_kwonlyargcount:0,
                co_name: "calculate_action_values",
                co_nlocals: 5,
                co_posonlyargcount: 0,
                co_varnames: $B.fast_tuple(["self", "history", "player", "legal", "actions_states"])
              }
            };_b_.None;
            return calculate_action_values502
          }
          $locals___main___UCTWins_389["calculate_action_values"] = calculate_action_values$502({})
          $locals___main___UCTWins_389["calculate_action_values"].$set_defaults = function(value){
            return $locals___main___UCTWins_389["calculate_action_values"] = calculate_action_values$502(value)
          }
          if($locals.$f_trace !== _b_.None){
            $B.trace_return(_b_.None)
          }
          $B.leave_frame({$locals})
          return $locals___main___UCTWins_389;
        }
        )();
        $UCTWins_389.__module__ = $locals___main__.__name__
        ;$locals___main__["UCTWins"] = $B.$class_constructor("UCTWins", $UCTWins_389, _b_.tuple.$factory([$locals___main__["UCT"]]),["$locals___main__[\"UCT\"]"],[])
        ;$locals___main__["UCTWins"].__doc__ = _b_.None;
        _b_.None;
        ;$locals.$line_info = "158,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
        var $UCTValues_394 = (function(){
          var $locals___main___UCTValues_394 = {__annotations__: $B.empty_dict()},
              $locals = $locals___main___UCTValues_394
          $locals.$name = "UCTValues"
          $locals.$qualname = "UCTValues"
          $locals.$is_class = true;
          $locals.$line_info = "158,__main__";
          var $top_frame = ["$locals___main___UCTValues_394", $locals,"__main__", $locals___main__]
          $locals.$f_trace = $B.enter_frame($top_frame);
          if($locals.$f_trace !== _b_.None){
            $locals.$f_trace = $B.trace_line()
          }
          ;$locals.$line_info = "159,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $locals___main___UCTValues_394["name"] = $B.String("jrb.mcts.uctv");
          ;$locals.$line_info = "160,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          $locals___main___UCTValues_394["action_template"] = $B.String("{action}: {average:.1f} ({sum} / {plays})");
          ;$locals.$line_info = "162,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          var __init__$505 = function($defaults){
            function __init__505(){
              var $locals___main___UCTValues_394___init___395 = {},
                  $locals = $locals___main___UCTValues_394___init___395;
              $locals___main___UCTValues_394___init___395 = $locals = $B.args("__init__", 2, {"self":null, "board":null}, ["self", "board"], arguments, $defaults, null, "kwargs");
              $locals.$line_info = "162,__main__"
              var $top_frame = ["__main___UCTValues_394___init___395", $locals,"__main__", $locals___main__, __init__505]
              $locals.$f_trace = $B.enter_frame($top_frame)
              var $stack_length = $B.frames_stack.length;
              try{
                $locals.__class__ = $B.get_method_class($locals___main__, "UCTValues")
                $B.js_this = this;
                ;$locals.$line_info = "163,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                $B.$call($B.$getattr($B.$call(_b_.super)($locals___main__["UCTValues"], $locals["self"]),"__init__"))($locals["board"],{$nat:"kw",kw:[{},$locals["kwargs"]]});
                ;$locals.$line_info = "164,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                $B.$setattr($locals["self"],"end_values",$B.$getattr($locals["board"],"points_values"));_b_.None;;
                if($locals.$f_trace !== _b_.None){
                  $B.trace_return(_b_.None)
                }
                $B.leave_frame({$locals});return _b_.None
              }catch(err){
                $B.set_exc(err)
                if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
                  $locals.$f_trace = $B.trace_exception()
                }
                $B.leave_frame({$locals});throw err
              }
            }
            __init__505.$is_func = true
            __init__505.$infos = {
              __name__:"__init__",
              __qualname__:"UCTValues.__init__",
              __defaults__ : _b_.None,
              __kwdefaults__ : _b_.None,
              __annotations__: {},
              __dict__: $B.empty_dict(),
              __doc__: _b_.None,
              __module__ : "__main__",
              __code__:{
                co_argcount:2,
                co_filename:$locals___main__["__file__"] || "<string>",
                co_firstlineno:162,
                co_flags:75,
                co_freevars: ["UCTValues"],
                co_kwonlyargcount:0,
                co_name: "__init__",
                co_nlocals: 3,
                co_posonlyargcount: 0,
                co_varnames: $B.fast_tuple(["self", "board", "kwargs"])
              }
            };_b_.None;
            return __init__505
          }
          $locals___main___UCTValues_394["__init__"] = __init__$505({})
          $locals___main___UCTValues_394["__init__"].$set_defaults = function(value){
            return $locals___main___UCTValues_394["__init__"] = __init__$505(value)
          }
          ;$locals.$line_info = "166,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
          var calculate_action_values$506 = function($defaults){
            function calculate_action_values506(_self, _history, _player, _legal){
              var $locals___main___UCTValues_394_calculate_action_values_396 = {},
                  $locals = $locals___main___UCTValues_394_calculate_action_values_396;
              var $len = arguments.length;
              var last_arg;if($len > 0 && ((last_arg = arguments[$len - 1]) !== undefined) && last_arg.$nat !== undefined){
                $locals___main___UCTValues_394_calculate_action_values_396 = $locals = $B.args("calculate_action_values", 4, {"self":null, "history":null, "player":null, "legal":null}, ["self", "history", "player", "legal"], arguments, $defaults, null, null);
              }else{
                if($len == 4){
                  $locals___main___UCTValues_394_calculate_action_values_396 = $locals = $B.conv_undef({"self": _self, "history": _history, "player": _player, "legal": _legal})
                }else if($len > 4){
                  $B.wrong_nb_args("calculate_action_values", $len, 4, ["self","history","player","legal"])
                }else if($len + Object.keys($defaults).length < 4){
                  $B.wrong_nb_args("calculate_action_values", $len, 4, ["self","history","player","legal"])
                }else{
                  $locals___main___UCTValues_394_calculate_action_values_396 = $locals = $B.conv_undef({"self": _self, "history": _history, "player": _player, "legal": _legal})
                  var defparams = ["self","history","player","legal"]
                  for(var i = $len; i < defparams.length; i++){
                    $locals[defparams[i]] = $defaults[defparams[i]]
                  }
                }
              }
              $locals.$line_info = "166,__main__"
              var $top_frame = ["__main___UCTValues_394_calculate_action_values_396", $locals,"__main__", $locals___main__, calculate_action_values506]
              $locals.$f_trace = $B.enter_frame($top_frame)
              var $stack_length = $B.frames_stack.length;
              try{
                $locals.__class__ = $B.get_method_class($locals___main__, "UCTValues")
                $B.js_this = this;
                ;$locals.$line_info = "167,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                $locals___main___UCTValues_394_calculate_action_values_396["actions_states"] = (function(expr){
                  var $locals_genexpr397 = {},
                      $locals = $locals_genexpr397
                  $locals.$line_info = '167,__main__'
                  $locals.$comp_code = {
                    co_argcount: 1,
                    co_firstlineno:167,
                    co_name: "<genexpr>",
                    co_flags: 115,
                    co_freevars: $B.fast_tuple([]),
                    co_kwonlyargcount: 0,
                    co_posonlyargount: 0,
                    co_varnames: $B.fast_tuple(['.0', 'a'])
                  }
                  $locals['.0'] = expr
                  
                  var $top_frame = ["genexpr397", $locals_genexpr397, "__main__", $locals___main__]
                  $locals.$f_trace = $B.enter_frame($top_frame)
                  var genexpr397 = function*(expr){
                    var $top_frame = ["genexpr397", $locals_genexpr397, "__main__", $locals___main__]
                    $locals.$f_trace = $B.enter_frame($top_frame)
                    var $next_func_422 = $B.next_of(expr)
                    while(true){
                      try{
                        var $next_422 = $next_func_422()
                      }catch(err){
                        if($B.is_exc(err, [_b_.StopIteration])){
                          break
                        }else{
                          $B.leave_frame({$locals, value: _b_.None});throw err
                        }
                      }
                      $locals_genexpr397["a"] = $next_422
                      
                      try{
                        var result = $B.fast_tuple([$B.$local_search('a'),$B.$call($B.$getattr($B.$getattr($B.$check_def_free("self",$locals___main___UCTValues_394_calculate_action_values_396["self"]),"board"),"next_state"))($B.$check_def_free("history",$locals___main___UCTValues_394_calculate_action_values_396["history"]), $B.$local_search('a'))])
                      }catch(err){
                        
                        $B.leave_frame($locals)
                        throw err
                      }
                      
                      try{
                        $B.leave_frame($locals)
                        yield result
                        $B.frames_stack.push($top_frame)
                      }catch(err1){
                        $B.frames_stack.push($top_frame)
                        throw err1
                      }
                    }
                    $B.leave_frame($locals)
                  }
                  $B.leave_frame($locals)
                  return $B.generator.$factory(genexpr397)(expr)
                }
                )($B.$check_def_free("legal",$locals___main___UCTValues_394_calculate_action_values_396["legal"]));
                ;$locals.$line_info = "168,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                var $res = $B.$call(_b_.sorted)((function(expr){
                  var $locals_genexpr398 = {},
                      $locals = $locals_genexpr398
                  $locals.$line_info = '168,__main__'
                  $locals.$comp_code = {
                    co_argcount: 1,
                    co_firstlineno:168,
                    co_name: "<genexpr>",
                    co_flags: 115,
                    co_freevars: $B.fast_tuple([]),
                    co_kwonlyargcount: 0,
                    co_posonlyargount: 0,
                    co_varnames: $B.fast_tuple(['.0', 'a', 'S'])
                  }
                  $locals['.0'] = expr
                  
                  var $top_frame = ["genexpr398", $locals_genexpr398, "__main__", $locals___main__]
                  $locals.$f_trace = $B.enter_frame($top_frame)
                  var genexpr398 = function*(expr){
                    var $top_frame = ["genexpr398", $locals_genexpr398, "__main__", $locals___main__]
                    $locals.$f_trace = $B.enter_frame($top_frame)
                    var $next_func_423 = $B.next_of(expr)
                    while(true){
                      try{
                        var $next_423 = $next_func_423()
                      }catch(err){
                        if($B.is_exc(err, [_b_.StopIteration])){
                          break
                        }else{
                          $B.leave_frame({$locals, value: _b_.None});throw err
                        }
                      }
                      try{
                        var $next_424 = $B.unpacker($next_423, 2, false, undefined)
                      }catch(err){
                        console.log("erreur");$B.leave_frame($locals); throw err
                      }
                      $locals_genexpr398["a"] = $next_424.read_one()
                      $locals_genexpr398["S"] = $next_424.read_one()
                      
                      
                      try{
                        var result = _b_.dict.$factory([[$B.String('action'),$B.$local_search('a')],[$B.String('average'),$B.rich_op("__truediv__", $B.$getattr($B.$getitem($B.$getattr($B.$check_def_free("self",$locals___main___UCTValues_394_calculate_action_values_396["self"]),"stats"),$B.$local_search('S')),"value"), $B.$test_expr($B.$test_item($B.$getattr($B.$getitem($B.$getattr($B.$check_def_free("self",$locals___main___UCTValues_394_calculate_action_values_396["self"]),"stats"),$B.$local_search('S')),"visits"))||$B.$test_item(1)))],[$B.String('sum'),$B.$getattr($B.$getitem($B.$getattr($B.$check_def_free("self",$locals___main___UCTValues_394_calculate_action_values_396["self"]),"stats"),$B.$local_search('S')),"value")],[$B.String('plays'),$B.$getattr($B.$getitem($B.$getattr($B.$check_def_free("self",$locals___main___UCTValues_394_calculate_action_values_396["self"]),"stats"),$B.$local_search('S')),"visits")]])
                      }catch(err){
                        
                        $B.leave_frame($locals)
                        throw err
                      }
                      
                      try{
                        $B.leave_frame($locals)
                        yield result
                        $B.frames_stack.push($top_frame)
                      }catch(err1){
                        $B.frames_stack.push($top_frame)
                        throw err1
                      }
                    }
                    $B.leave_frame($locals)
                  }
                  $B.leave_frame($locals)
                  return $B.generator.$factory(genexpr398)(expr)
                }
                )($B.$check_def_free("actions_states",$locals___main___UCTValues_394_calculate_action_values_396["actions_states"])),{$nat:"kw",kw:{key:(function($locals_lambda425){
                  var $B = __BRYTHON__,
                      _b_ = __BRYTHON__.builtins,
                      $locals = $locals_lambda425;
                  
                  $locals_lambda425.__package__ = ""
                  $locals.__annotations__ = $B.empty_dict()
                  var $top_frame = ["lambda425", $locals_lambda425, "__main__", $locals___main__]
                  $locals.$f_trace = $B.enter_frame($top_frame)
                  var $stack_length = $B.frames_stack.length;
                  try{
                    ;$locals.$line_info = "168,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                    var lambda_4ynw589e_425$532 = function($defaults){
                      function lambda_4ynw589e_425532(_x){
                        var $locals_lambda425_lambda_4ynw589e_425_426 = {},
                            $locals = $locals_lambda425_lambda_4ynw589e_425_426;
                        var $len = arguments.length;
                        var last_arg;if($len > 0 && ((last_arg = arguments[$len - 1]) !== undefined) && last_arg.$nat !== undefined){
                          $locals_lambda425_lambda_4ynw589e_425_426 = $locals = $B.args("lambda_4ynw589e_425", 1, {"x":null}, ["x"], arguments, $defaults, null, null);
                        }else{
                          if($len == 1){
                            $locals_lambda425_lambda_4ynw589e_425_426 = $locals = $B.conv_undef({"x": _x})
                          }else if($len > 1){
                            $B.wrong_nb_args("lambda_4ynw589e_425", $len, 1, ["x"])
                          }else if($len + Object.keys($defaults).length < 1){
                            $B.wrong_nb_args("lambda_4ynw589e_425", $len, 1, ["x"])
                          }else{
                            $locals_lambda425_lambda_4ynw589e_425_426 = $locals = $B.conv_undef({"x": _x})
                            var defparams = ["x"]
                            for(var i = $len; i < defparams.length; i++){
                              $locals[defparams[i]] = $defaults[defparams[i]]
                            }
                          }
                        }
                        $locals.$line_info = "168,__main__"
                        var $top_frame = ["lambda425_lambda_4ynw589e_425_426", $locals,"__main__", $locals___main__, lambda_4ynw589e_425532]
                        $locals.$f_trace = $B.enter_frame($top_frame)
                        var $stack_length = $B.frames_stack.length;
                        try{
                          $B.js_this = this;
                          ;$locals.$line_info = "2,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                          var $res = $B.fast_tuple([$B.$getitem($locals["x"],$B.String('average')),$B.$getitem($locals["x"],$B.String('plays'))]);
                          if($locals.$f_trace !== _b_.None){
                            $B.trace_return($res)
                          }
                          $B.leave_frame({$locals});
                          return $res;
                        }catch(err){
                          $B.set_exc(err)
                          if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
                            $locals.$f_trace = $B.trace_exception()
                          }
                          $B.leave_frame({$locals});throw err
                        }
                      }
                      lambda_4ynw589e_425532.$is_func = true
                      lambda_4ynw589e_425532.$infos = {
                        __name__:"<lambda>",
                        __qualname__:"<lambda>",
                        __defaults__ : _b_.None,
                        __kwdefaults__ : _b_.None,
                        __annotations__: {},
                        __dict__: $B.empty_dict(),
                        __doc__: _b_.None,
                        __module__ : "__main__",
                        __code__:{
                          co_argcount:1,
                          co_filename:$locals___main__["__file__"] || "<string>",
                          co_firstlineno:168,
                          co_flags:67,
                          co_freevars: [],
                          co_kwonlyargcount:0,
                          co_name: "<lambda>",
                          co_nlocals: 1,
                          co_posonlyargcount: 0,
                          co_varnames: $B.fast_tuple(["x"])
                        }
                      };_b_.None;
                      return lambda_4ynw589e_425532
                    }
                    $locals_lambda425["lambda_4ynw589e_425"] = lambda_4ynw589e_425$532({})
                    $locals_lambda425["lambda_4ynw589e_425"].$set_defaults = function(value){
                      return $locals_lambda425["lambda_4ynw589e_425"] = lambda_4ynw589e_425$532(value)
                    }
                    $B.leave_frame({$locals, value: _b_.None})
                  }catch(err){
                    $B.leave_frame({$locals, value: _b_.None})
                    throw err
                  }
                  
                  return $locals.lambda_4ynw589e_425})({}), reverse:_b_.True}});
                  if($locals.$f_trace !== _b_.None){
                    $B.trace_return($res)
                  }
                  $B.leave_frame({$locals});
                  return $res;
                }catch(err){
                  $B.set_exc(err)
                  if((! err.$in_trace_func) && $locals.$f_trace !== _b_.None){
                    $locals.$f_trace = $B.trace_exception()
                  }
                  $B.leave_frame({$locals});throw err
                }
              }
              calculate_action_values506.$is_func = true
              calculate_action_values506.$infos = {
                __name__:"calculate_action_values",
                __qualname__:"UCTValues.calculate_action_values",
                __defaults__ : _b_.None,
                __kwdefaults__ : _b_.None,
                __annotations__: {},
                __dict__: $B.empty_dict(),
                __doc__: _b_.None,
                __module__ : "__main__",
                __code__:{
                  co_argcount:4,
                  co_filename:$locals___main__["__file__"] || "<string>",
                  co_firstlineno:166,
                  co_flags:67,
                  co_freevars: ["a","S","key","x","reverse"],
                  co_kwonlyargcount:0,
                  co_name: "calculate_action_values",
                  co_nlocals: 5,
                  co_posonlyargcount: 0,
                  co_varnames: $B.fast_tuple(["self", "history", "player", "legal", "actions_states"])
                }
              };_b_.None;
              return calculate_action_values506
            }
            $locals___main___UCTValues_394["calculate_action_values"] = calculate_action_values$506({})
            $locals___main___UCTValues_394["calculate_action_values"].$set_defaults = function(value){
              return $locals___main___UCTValues_394["calculate_action_values"] = calculate_action_values$506(value)
            }
            if($locals.$f_trace !== _b_.None){
              $B.trace_return(_b_.None)
            }
            $B.leave_frame({$locals})
            return $locals___main___UCTValues_394;
          }
          )();
          $UCTValues_394.__module__ = $locals___main__.__name__
          ;$locals___main__["UCTValues"] = $B.$class_constructor("UCTValues", $UCTValues_394, _b_.tuple.$factory([$locals___main__["UCT"]]),["$locals___main__[\"UCT\"]"],[])
          ;$locals___main__["UCTValues"].__doc__ = _b_.None;
          _b_.None;
          $B.leave_frame({$locals, value: _b_.None})
        }catch(err){
          $B.leave_frame({$locals, value: _b_.None})
          throw err
        }
        
