import Vue from "vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faMinusCircle, faFilter, faBars, faUser, faSearch, faColumns, faAngleDown, faUndo, faClone, faAngleRight} from '@fortawesome/free-solid-svg-icons'

library.add ( faMinusCircle, faFilter, faBars , faUser, faSearch, faColumns, faAngleDown, faUndo, faClone, faAngleRight)

Vue.component("font-awesome-icon", FontAwesomeIcon);