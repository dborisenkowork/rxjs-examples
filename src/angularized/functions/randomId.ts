export function randomId(length: number) {
    var text = "";
    var possible = "abcdef0123456789";

    for(var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}