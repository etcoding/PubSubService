module etcoding {
    export class PubSubService {
        public DataBag = {};

        private pubSubList = {};
        private idToEventMap = {};
         
        private id = 0;

        public Subscribe(eventName: string, action: (args?: any) => any, id?: string) {
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
        }

        public Unsubscribe(id: string) {
            var eventName = this.idToEventMap[id];
            if (!eventName) {
                console.warn("PubSub: Could not unsubsribe, event with id " + id + " not found");
                return;
            }
            delete this.pubSubList[eventName][id];
        }

        public UnsubscribeAll(eventName: string) {
            delete this.pubSubList[eventName];
        }

        public Publish(eventName: string, args?: any) {
            if (!this.pubSubList[eventName])
                return;

            for (var idx in this.pubSubList[eventName]) {
                this.pubSubList[eventName][idx](args);
            }
        }


        public CreateId() {
            return (++this.id).toString();
        }
    }
}
