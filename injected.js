window.__SAMPLE_EXTENSION_NAMESPACE__ = {
    getElementTree() {
        return {
            tagName: "body",
            children: this.getElementTreeForNode({ el: document.body })
        };

    },

    getElementTreeForNode({ el }) {
        const childList = [];

        const treeWalker = document.createTreeWalker(
            el,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode(node) {
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );

        let node = treeWalker.firstChild();
        while(node) {
            childList.push({
                tagName: node.tagName.toLowerCase(),
                children: this.getElementTreeForNode({ el: node })
            });
            node = treeWalker.nextSibling();
        }

        return childList;
    }
};

window.__PSA_NAMESPACE__ = {
    traded(buyOrSell){
        alert(`You just traded, ${buyOrSell}`);
        //make call to firebase
        chrome.runtime.sendMessage('publish-trade', (response) => {
            console.log('received user data', response);
            alert("Published trade!");
        });
    },
    
    checkIfSubmitButton(element){
        return element.tagName == 'BUTTON' && element.classList.contains("submit");
    },
    
    someListener(event){
        var element = event.target;
        console.log(element)
        const submitButtonCheck = __PSA_NAMESPACE__.checkIfSubmitButton(element);
        const buyOrSell = element.innerText;
        const buyOrSellCheck = buyOrSell === "Buy" || buyOrSell === "Sell";
        console.log('submitButtonCheck',submitButtonCheck)
        console.log('buyOrSellCheck',buyOrSellCheck)
        console.log('buyOrSell',buyOrSell)
        if(submitButtonCheck && buyOrSellCheck){
            __PSA_NAMESPACE__.traded(buyOrSell);
        }else if(!submitButtonCheck && buyOrSellCheck){
            // check parent
            if(__PSA_NAMESPACE__.checkIfSubmitButton(element.parentElement))
                __PSA_NAMESPACE__.traded(buyOrSell)
        }
    }
}

document.addEventListener( "click", window.__PSA_NAMESPACE__.someListener, false);

