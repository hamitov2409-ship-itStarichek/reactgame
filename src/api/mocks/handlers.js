import { http, HttpResponse } from 'msw'

export const handlers = [
  // Успешный запрос лидерборда
  http.get('https://api.yourgame.com/v1/leaderboard', ({ request }) => {
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit')) || 10
    
    const mockPlayers = Array.from({ length: limit }, (_, index) => ({
      id: `player-${index + 1}`,
      username: `TopPlayer${index + 1}`,
      score: 10000 - (index * 100),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=player${index + 1}`,
      clan: index % 3 === 0 ? 'Dragon' : index % 3 === 1 ? 'Phoenix' : 'Tiger',
      date: new Date(Date.now() - index * 86400000).toISOString()
    }))

    return HttpResponse.json({
      success: true,
      data: {
        players: mockPlayers,
        pagination: {
          total: 100,
          page: 1,
          limit
        }
      }
    })
  }),

  // Симуляция ошибки сервера
  http.get('https://api.yourgame.com/v1/leaderboard-error', () => {
    return HttpResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Internal server error'
        }
      },
      { status: 500 }
    )
  }),

  // Симуляция пустого лидерборда
  http.get('https://api.yourgame.com/v1/leaderboard-empty', () => {
    return HttpResponse.json({
      success: true,
      data: {
        players: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 10
        }
      }
    })
  })
]
