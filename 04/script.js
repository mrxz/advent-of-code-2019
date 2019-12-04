startNum = 130254
endNum = 678275

candidates = []

check = (number) => {
    if([...(""+number).matchAll(/([1-9])\1+/g)].filter(m => m[0].length === 2).length === 0) {
        return false
    }

    // Part 1
    //if(!/([1-9])\1+/.test(""+number)) {
    //    return false;
    //}
    
    l = 0
    for(d of (""+number)) {
        if(+d < l) {
            return false
        }
        l = d
    }
    
    return true;
}

result = []
for(num = startNum; num < endNum; num++) {
    if(check(num)) {
        result.push(num);
    }
}
