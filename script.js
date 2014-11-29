/**
 * Created by i on 14-11-28.
 */
function main () {
    console.log('zones in action');
    var fbData = new Firebase('https://tezt.firebaseio.com/anyapp/init');

    fbData.set({
        name: 'Any App',
        id: 'anyappID',
        index: 'any-app',
        priority: 0,
        type: 'init',
        permissions: {
            user: 'all',
            domain: 'localhost',
            device: 'all'
        },
        data: [
            {
                name: 'test',
                deps: [''],
                components:[
                    {
                        'services':[
                            {
                                name: 'testService',
                                type: 'service',
                                id: 'testService',
                                data: {
                                    test: this.name + 'This Service Test Passes'
                                }
                            }
                        ]},
                    'templates',
                    'controllers',
                    'states'
                ]
            }
        ],
        methods: [
            {
                name: 'test',
                type: 'test',
                arguments: ['message'],
                test: {},
                filters: 'console.log("method fired");'
            }
        ],
        states: {
            active: true,
            alive: false
        }
    });

        fbData.on('value', function(snapshot) {
            var readData = snapshot.val();
            console.log('id: ', readData.id);
            console.log('name: ', readData.name);
            console.log('type: ', readData.type);
            console.log('data: ', readData.data[0].components);
            console.log('permissions: ', readData.permissions);

            (function initApp (name, deps, components) {
                var anyapp = angular.module(name, deps);
                angular.forEach(components, function(component) {
                    console.log('component: ', component);
                    angular.forEach(component, function(entry) {
                        console.log('component entry: ', entry);
                        angular.forEach(entry, function (data) {
                            console.log('component entry data: ', data);
                            angular[data.type](data.name,function(){
                                var entryData = data.data;
                                console.log('entryData: ', entryData);
                                return entryData;
                            });
                        });

                    })
                });
                console.log('anyapp',anyapp);
            })(readData.name, readData.data[0].deps, readData.data[0].components);


            (function throwError(message) {
                throw new Error(message);
            })(readData.name);
        });

}
/*
 * What if your stack trace could tell you what
 * order the user pushed the buttons from the stack trace?
 *
 * What if you could log this back to the server?
 *
 * Think of how much more productive your debugging could be!
 */


/*
 * Bootstrap the app
 */
//main();
zone.fork(Zone.longStackTraceZone).run(main);