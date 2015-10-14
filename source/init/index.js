import compose from '../compose';

const init = (...functions) => compose({ initializers: [...functions] });

export default init;
