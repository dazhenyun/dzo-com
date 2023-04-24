import { depUtil, registerExternal } from './external';
import { setGlobalVar } from './globalConfig';

const DZ = { ...depUtil, registerExternal };

export { DZ };

/**
 * 暴露全局变量api
 */
setGlobalVar('$DZ', DZ);
