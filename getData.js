export function getData(arg) {
    const language = {
        ko: require('./data/lang/kor_new.json'),
        en: require('./data/lang/eng_new.json'),
        //th: require('./data/lang/th_new.json'),
        ru: require('./data/lang/ru_new.json')
    }
    let data = language[arg];
    return data;
}
