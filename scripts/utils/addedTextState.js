const addedTextStateMap = new Map();

export function showAddedText(productId, element, addAddedText, removeAddedText){

    addAddedText(element);

    const addedTextState = addedTextStateMap.get(productId) || {
        isAddedTextAppear: false,
        timeoutId: null
    }

    if(!addedTextState.isAddedTextAppear){

        addedTextState.timeoutId = setTimeout(() => {
                                    removeAddedText(element);
                                }, 2000);

        addedTextState.isAddedTextAppear = true;
    } else {

        clearTimeout(addedTextState.timeoutId);

        addedTextState.timeoutId = setTimeout(() => {
                                    removeAddedText(element);
                                }, 2000);
    }

    addedTextStateMap.set(productId, addedTextState);
}