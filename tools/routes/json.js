const express = require('express')
const router = express.Router()
const fs = require('fs')
let arrayOfFiles = []
const functionFolders = fs.readdirSync('info/json')
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`info/json/${folder}`).filter(file => file.endsWith('json'))
    let objOfFiles = { folder: folder, data: [] }
    for (const file of functionFiles) {
        const functionRead = fs.readFileSync(`info/json/${folder}/${file}`)
        const data = JSON.parse(functionRead)
        objOfFiles.data.push(data)
    }
    arrayOfFiles.push(objOfFiles)
}

router.get('/', async (req, res) => {
    res.json(arrayOfFiles)
})

router.get('/:folder', getJSON, async (req, res) => {
    res.status(201).json(res.data);
})

router.get('/:folder/:id', getJSONFile, async (req, res) => {
    res.status(201).json(res.data)
})

async function getJSON(req, res, next) {
    let json;
    try {
        json = arrayOfFiles.find(obj => obj.folder === req.params.folder);
        if (!json) {
            return res.status(404).json({ message: "JSON not found" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.data = json;
    next()
}

async function getJSONFile(req, res, next) {
    let json;
    try {
        json = arrayOfFiles.find(obj => obj.folder === req.params.folder);
        if (!json) {
            return res.status(404).json({ message: "Invalid Folder" });
        }
        const data = json.data;
        json = data.filter(function (entry) {
            if (Number(entry.id) === Number(req.params.id)) {
                return true;
            }
            return false;
        })
        if (!json) {
            return res.status(403).json({ message: "Invalid File" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.data = json[0];
    next()
}

module.exports = router;