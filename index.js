const cron = require('node-cron')
const {db,http,signs} = require('./util')

class Main {
    static async getHoroscope(){
        const todayHoroscope = []
        for (const sign of signs) {
            const {horoscope} = (await http.get("/" + sign)).data;
            todayHoroscope.push({
                sign,
                horoscope
            })
        }
        const name = new Date().toLocaleDateString() + ".json"
        db.setItem(name,JSON.stringify(todayHoroscope))
        console.log(name)
    }
}

cron.schedule("* * * * * *",()=>{
    Main.getHoroscope();
})