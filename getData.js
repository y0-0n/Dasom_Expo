export function getData(arg) {
    const language = {
        ko: require('./data/lang/kor.json'),
        en: require('./data/lang/eng.json')
    }
    let data = language[arg];
    return data;
}
