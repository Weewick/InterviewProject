export const enum Types {
    string = "string",
    number = "number",
    date = "date"
};

type ownType = {
    type: Types;
    array: boolean;
}

export default ownType;