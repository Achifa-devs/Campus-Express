

export function validate_inputs(input, list, file) {
    if(input === 'select'){
        let response = list.map((item) => selects(item.value, item.name, item))
        // console.log(response)
        return response;
    }else if(input === 'input'){
        let response = list.map((item) => inputs(item.value, item.name, item,file))
        // console.log(response)
        return response;
    }else if(input === 'textarea'){
        let response = list.map((item) => textareas(item.value, item.name, item))
        // console.log(response)
        return response;
    }
}




function selects(item, name, element) {
    let check = item.length < 1 ? {err: `${name} cannot be empty`, success: false, name: name, element: element}  :  {err: '', success: true, name: name, element: element}
    return check;
}



function inputs(item, name, element, file) {
    if(name==='stock'){
        let check = item.length < 1 ? {err: `sorry ${name} cannot be empty`, success: false, name: name, element: element}  : item < 1 ? {err: `sorry stock can"t be less than one`, success: false, name: name, element: element} : {err: ``, success: true, name: name, element: element}
        return check;
    }else if(name === `price`){
        let check = item.length < 1 ? {err: `sorry ${name} cannot be empty`, success: false, name: name, element: element} : item < 50 ? {err: `sorry price can"t be less than fifty naira`, success: false, name: name, element: element} : {err: ``, success: true, name: name, element: element}
        return check;
    }
    else if (name === 'samples-images') {
        // let check = file.length < 1 ? {err: `sorry sample images cannot be empty`, success: false, name: name, element: element} : {err: ``, success: true, name: name, element: element}
        return {err: ``, success: true, name: name, element: element};
    }
    else {
        let check = item.length < 1 ? {err: `sorry ${name} cannot be empty`, success: false, name: name, element: element}  : item < 1 ? {err: `sorry stock can"t be less than one`, success: false, name: name, element: element} : {err: ``, success: true, name: name, element: element}
        return check;
    }
}



function textareas(item, name, element) {
    if(name==='title'){
        let check = item.length < 1 ? {err: 'sorry field cannot be empty', success: false, name: name, element: element}  : item.split(' ').length < 2  ? {err: 'sorry your title must contain at least 2 words', success: false, name: name, element: element} : {err: '', success: true, name: name, element: element}
        return check;
    }else if(name === 'description'){
        let check = item.length < 1 ? {err: 'sorry field cannot be empty', success: false, name: name, element: element} : item.split(' ').length < 10  ?{err: 'sorry your description must contain at least 10 words', success: false, name: name, element: element} : {err: '', success: true, name: name, element: element}
        return check;
    }
    
}

//select checklist
