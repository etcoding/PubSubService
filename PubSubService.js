var etcoding;
(function(etcoding) {
  
  var PubSubService = (function() {
    function PubSubService() {
      this.DataBag = {};
      this.pubSubList = {};
      this.idToEventMap = {};
      this.id = 0;
    }
    
    
    PubSubService.prototype.Subscribe = function(eventName, action, id) {
      if (!this.pubSubList[eventName]) {
        this.pubSubList[eventName] = {};
      }
      if (id === undefined)
        id = this.CreateId();
      if (this.pubSubList[eventName][id])
        console.warn("PubSub: Handler for " + eventName + " with id " + id + " already exists. Replacing.");
      this.pubSubList[eventName][id] = action;
      this.idToEventMap[id] = eventName;
      return id;
    };
    
    
    PubSubService.prototype.Unsubscribe = function(id) {
      var eventName = this.idToEventMap[id];
      if (!eventName) {
        console.warn("PubSub: Could not unsubsribe, event with id " + id + " not found");
        return;
      }
      delete this.pubSubList[eventName][id];
    };
    
    
    PubSubService.prototype.UnsubscribeAll = function(eventName) {
      delete this.pubSubList[eventName];
    };
    
    
    PubSubService.prototype.Publish = function(eventName, args) {
      if (!this.pubSubList[eventName])
        return;
      for (var idx in this.pubSubList[eventName]) {
        this.pubSubList[eventName][idx](args);
      }
    };
    
    
    PubSubService.prototype.CreateId = function() {
      return (++this.id).toString();
    };
    
    
    return PubSubService;
  })();
  etcoding.PubSubService = PubSubService;
})(etcoding || (etcoding = {}));

angular.module("etcoding").service("PubSubService", [etcoding.PubSubService]);