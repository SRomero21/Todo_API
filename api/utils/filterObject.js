const filterObject = (obj, ...allowFields) => {
    const newObject = {};

    Object.keys(obj).forEach((el) => {
        if(allowFields.includes(el)) {
            newObject = obj[el]
        }
    });
    
    return newObject;
};

module.exports = { filterObject }