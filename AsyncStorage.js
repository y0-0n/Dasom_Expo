export async function isFirstLaunch(AsyncStorage) {
    const value = await AsyncStorage.getItem("firstLaunch");

    return value;
}

export async function setFirstLaunch(AsyncStorage, object) {
    AsyncStorage.setItem("sex", object.sex); 
    return AsyncStorage.setItem("firstLaunch", 'false');;
}

export async function getSex(AsyncStorage) {
    const value = await AsyncStorage.getItem("sex");

    return value;
}
export async function getLanguage(AsyncStorage) {
    const value = await AsyncStorage.getItem("language");

    return value;
}

export async function setLanguage(AsyncStorage, language) {
    return await AsyncStorage.setItem("language", language);
}

export async function load(AsyncStorage) {
    const value = await AsyncStorage.getItem("symptom");

    return value;
}

export async function save(AsyncStorage, symptom) {
    return await AsyncStorage.setItem("symptom", symptom);
}

