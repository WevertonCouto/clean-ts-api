import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect('mongodb://127.0.0.1:50450/')
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
