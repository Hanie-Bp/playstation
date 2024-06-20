const createElement = (name, content, classes) => {
    const element = document.createElement(name);
    if (classes) {
        element.classList.add(...classes)
    }
    if (content) {
        element.append(...content)
    }

    return element;
  };
  
  const selectedElement = (query) => {
    const element = document.querySelector(query);
    return element;
  };

  
  
//  export {createElement,selectedElement};