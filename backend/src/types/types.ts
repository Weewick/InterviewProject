enum Types {
    string = <any>"string",
    number = <any>"number",
    date = <any>"date"
};

export function validType(type: Types, data: string): boolean {
    switch (type) {
        case Types.string:
            return true;           
        case Types.number:
            return !isNaN(+data);
        case Types.date:
            return validDate(data);
        default:
            throw new Error(`Non-existent type in switch: ${type}`);
    }
}

function validDate(dateString: string): boolean {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format

    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date

    return d.toISOString().slice(0,10) === dateString;
}

export default Types;