function makePrimeArray(n) {
    let seq = [...Array(n + 1).keys()]; //0-nの数列配列を生成
    let ans = []; //エラトステネスのふるい方式で素数を入れていく
    seq.splice(0, 2); //0と1は素数ではない

    while (seq.length > 0) {
        let prime = seq.shift();
        ans.push(prime);
        seq = seq.filter((elem) => { return elem % prime !== 0; });
    }
    return ans;
}