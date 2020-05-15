import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfile = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Anderson Silva',
      email: 'anderson@spider.com.br',
      password: '12345678',
    })

    const profile = await showProfile.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('Anderson Silva')
    expect(profile.email).toBe('anderson@spider.com.br')
  })

  it('should not be able to show user profile from non-existing user', async () => {
    expect(
      showProfile.execute({ user_id: 'non-existing-userid' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
