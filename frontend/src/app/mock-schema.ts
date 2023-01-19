const personSchema = {
    name: {
        dataType: 'string',
    },
    age: {
        dataType: 'number',
    },
    birthdate: {
        dataType: 'date',
    },
    residence: {
        country: {
            dataType: 'string',
        },
        city: {
            dataType: 'string',
        },
        test: {
            val1: {
                dataType: 'number',
            },
            val2: {
                dataType: 'date',
            },
        },
    },
    wishlist: {
        dataType: 'string[]',
    }, 
};

export default personSchema;