/**
 * Created by i on 14-11-28.
 */
function main () {
    console.log('zone go: ', start = Date.now());
    console.log('zones in action');
    var fbData = new Firebase('https://tezt.firebaseio.com/anyapp/model/');
/*
    fbData.push({
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
                                    test: this.name + 'This Service Also Passes'
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
*/
    fbData.on('value', function(snapshot) {
        var readData = snapshot.val();
        console.log(readData);


        (function initApp (name, deps, components) {
            if(readData.type === 'init'){
                anyapp = angular.module(name, deps);
            }
            angular.forEach(components, function(component) {
                angular.forEach(component, function(entry) {
                    angular.forEach(entry, function (data) {
                        var entryData = data.data;
                        console.log('entryData: ', entryData);
                    });
                })
            });

        })(readData.name, readData.data[0].deps, readData.data[0].components);
        console.log('anyapp',anyapp);


        (function throwError(message) {
            throw new Error(message);
        })(readData.name);
    });
    console.log('zone stop: ', start - Date.now());
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