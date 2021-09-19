//based on: https://github.com/heilhead/react-bootstrap-validation/blob/master/src/FileValidator.js
const iterate = (files, cb) => {
    Array.prototype.forEach.call(files, cb)
}

const getTotalFileSize = files => {
    let result = 0
    iterate(files, file => result += file.size)

    return result
}

const getFileExtension = filename => filename
    .substr((~-filename.lastIndexOf('.') >>> 0) + 2)
    .toLowerCase()

/**
 * Returns `true` if there are no files in file list
 *
 * @param {FileList} files File list
 * @returns {Boolean}
 */
export const isEmpty = files => files.length === 0

/**
 * Returns `true` if files count equals to 1
 *
 * @param {FileList} files File list
 * @returns {Boolean}
 */
export const isSingle = files => files.length === 1

/**
 * Returns `true` if files count is more than 1
 *
 * @param {FileList} files File list
 * @returns {Boolean}
 */
export const isMultiple = files => files.length > 1

/**
 * Returns `true` if files count is within allowed range.
 * If `max` is not supplied, checks if files count equals `min`.
 *
 * @param {FileList} files File list
 * @param {Number} min Minimum files count
 * @param {Number} [max] Maximum files count
 * @returns {Boolean}
 */
export const isFilesCount = (files, min, max) => {
    if (!max) {
        return files.length === min
    } else {
        return files.length >= min && files.length <= max
    }
}

/**
 * Returns `true` if total size of all files is within allowed range.
 *
 * @param {FileList} files File list
 * @param {Number} [max] Maximum size in bytes
 * @returns {Boolean}
 */
export const isTotalSize = (files, max) => {
    let totalSize = getTotalFileSize(files)

    return !max || totalSize <= max
}

/**
 * Returns `true` if each file's size is within allowed range
 *
 * @param {FileList} files File list
 * @param {Number} [max] Maximum size
 * @returns {Boolean}
 */
export const isEachFileSize = (files, max) => {
    let allValid = true

    iterate(files, file => {
        let fileValid = !max || file.size <= max

        if (!fileValid) {
            allValid = false
        }
    })

    return allValid
}

/**
 * Returns `true` if each file's extension is in the `extensions` array
 *
 * @param {FileList} files File list
 * @param {Array} extensions Array of allowed file extensions. All extensions must be lower-case.
 * @returns {Boolean}
 */
export const isExtension = (files, extensions) => {
    let allValid = true

    iterate(files, file => {
        let ext = getFileExtension(file.name)

        if (extensions.indexOf(ext) === -1) {
            allValid = false
        }
    })

    return allValid
}

/**
 * Returns `true` if each file's mime type is in the `types` array
 *
 * @param {FileList} files File list
 * @param {Array} types Array of allowed mime types
 * @returns {Boolean}
 */
export const isType = (files, types) => {
    let allValid = true

    iterate(files, file => {
        if (types.indexOf(file.type) === -1) {
            allValid = false
        }
    })

    return allValid
}
