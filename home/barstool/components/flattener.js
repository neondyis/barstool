export default function flattenObject (obj)  {
    // The object which contains the
    // final result
    let result = {};

    // loop through the object "ob"
    for (const i in obj) {

        // We check the type of the i using
        // typeof() function and recursively
        // call the function again
        if ((typeof obj[i]) === 'object') {
            const temp = flattenObject(obj[i]);
            for (const j in temp) {

                // Store temp in result
                // Store temp in result
                // @ts-ignore
                result[j] = temp[j];
            }
        }
        // Else store ob[i] in result directly
        else {
            // @ts-ignore
            result[i] = obj[i];
        }
    }
    return result;
}
