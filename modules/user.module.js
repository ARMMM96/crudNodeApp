heads = [
    { key: "id", default: Date.now() },
    { key: "name", default: null },
    { key: "age", default: null },
    { key: "email", default: null },
    { key: "status", default: false }];
const deal = require("./deal.module");
const chalk = require('chalk');
const { number } = require("yargs");

class User {
    static add(data) {
        const user = {}
        heads.forEach(head => {
            if (head.default != null)
                user[head.key] = head.default
            else user[head.key] = data[head.key]
        });
        const all = deal.readFromJson()
        if (data.id) {
            console.log('fire?')
            delete user.id;
            user.id = data.id;
        }
        console.log(user)
        all.push(user)
        deal.writeToJson(all)
    }
    static showAll() {
        const all = deal.readFromJson()
        console.log(all);
    }
    static showSingle(name) {
        const all = deal.readFromJson()
        const usersFind = all.find((e) => e.name === name.name)
        if (usersFind) {
            console.log(chalk.inverse.blue(usersFind.name))
            console.log(chalk.inverse.blue(usersFind.age))
            console.log(chalk.inverse.blue(usersFind.email))
            console.log(chalk.inverse.blue(usersFind.status))

        } else {
            console.log(chalk.red.inverse('Note not found!'))
        }
    }
    static edit(name) {
        if (name.oldname == '' || name.oldname == undefined) {
            console.log(chalk.red.inverse('Please enter user name that you want update!'))
        } else {
            const all = deal.readFromJson()
            const oldUser = all.find((e) => e.name === name.oldname);
            if (oldUser) {
                name.id = oldUser.id;
                const oldName = name.oldname;
                const newName = name.newname;
                delete name.oldname;
                delete name.newname;
                name.name = oldName;
                this.del(name)
                name.name = newName;
                this.add(name)
                console.log(name);
            } else {
                console.log(chalk.red.inverse('User not Exist'))

            }


        };
    }
    static del(name) {
        const all = deal.readFromJson()
        const namesToKeep = all.filter((e) => e.name !== name.name)
        if (all.length > namesToKeep.length) {
            console.log(chalk.redBright.inverse(`${name.name} Deleted`))
            deal.writeToJson(namesToKeep)
        } else {
            console.log(chalk.red.inverse('No note found!'))
        }
    }
}
module.exports = User