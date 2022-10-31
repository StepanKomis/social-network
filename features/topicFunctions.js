

exports.short =  (str, len) =>{
    if (str !== undefined) {
        if (str.length >= len) {
            subStr = str.substr(0, len) + '…';
            return subStr;
            }
        else {
            return str;
        }
    }
}