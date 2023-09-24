const Namespace = require('../classes/Namespace');
const Room = require('../classes/Room');

const wikiNs = new Namespace(0, 'Wikipedia', "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png", "/wiki")
const mozNS = new Namespace(1, 'Mozilla', "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png", "/mozilla")
const linuxNs = new Namespace(2, 'linux', "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png", "/linux")

wikiNs.addRoom(new Room(0, 'New Article', 0));
wikiNs.addRoom(new Room(1, 'Editors', 0));
wikiNs.addRoom(new Room(2, 'Other', 0));

mozNS.addRoom(new Room(0, 'FireFox', 1))
mozNS.addRoom(new Room(1, 'SeaMonkey', 1))
mozNS.addRoom(new Room(2, 'SpiderMonkey', 1))
mozNS.addRoom(new Room(3, 'Rust', 1))

linuxNs.addRoom(new Room(0, 'Debian', 2))
linuxNs.addRoom(new Room(0, 'Red Hat', 2))
linuxNs.addRoom(new Room(0, 'Ubantu', 2))
linuxNs.addRoom(new Room(0, 'Mac OS', 2))



const Namespaces = [wikiNs,mozNS,linuxNs]

module.exports = Namespaces;