import ElectronStore from 'electron-store'
import { join } from 'path'
import { encrypt, decrypt } from './crypt'
export default class extends ElectronStore {
    constructor(name: string) {
        super({
            cwd: join(process.cwd(), '.db'),
            name,
            fileExtension: 'edb',
            serialize: (value: any): string => encrypt(JSON.stringify(value)),
            deserialize: (value: string): any => JSON.parse(decrypt(value)),
        })
    }
}
