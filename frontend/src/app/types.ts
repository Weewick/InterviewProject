enum Types {
    string = <any>"string",
    number = <any>"number",
    date = <any>"date"
}

export function typeTest(value: string, type: Types): string {
    switch (type) {
        case Types.string:
            return "Success: Valid string!";            
        case Types.number:
            if (isNaN(+value)) {
                return "Error: Input is not a number!";
            } else {
                return "Success: Valid number!";
            }
        case Types.date:
            if (!isValidDate(value)) {
                return "Error: Input is not a valid date!";
            } else {
                return "Success: Valid date!";
            }
        default:
            throw new Error(`Non-existent type in switch: ${type}`);
    }
}

function isValidDate(dateString: string): boolean {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format

    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date

    return d.toISOString().slice(0,10) === dateString;
}

export default Types;