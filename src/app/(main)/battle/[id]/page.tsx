import React from 'react'

const Battle = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">

      <main className="flex-grow container mx-auto px-6 py-8 flex justify-center items-center">
        <div className="w-full max-w-2xl text-center">
          {/* Battle Image */}
          <div className="relative mb-6">
            <div
              className="aspect-[4/3] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6UCs9l8SLucUYrkdE0B2nxD-KFmVFW4Xf2Dk8W-gmZ_aPeXsaGiwgDyGL6quyh8VVylcEgbuQKSS0hL28wB_39hkaFblcByUNlbtTZtfKXP0OfvQzAh_3oCv6fCvSoUByO8Eawtx7GRJJi1B6XRCgm27-dl29EDM7NlaQ14bWl2VTq3EmykXEOMYv3bzAtCW9g6OS6a_upM7Hoo9XTnFNBq2RUo8eAPqiW6ycoj3FcAhsNVJ6aQRnOggZf96gz8fOlrFR5rm6DZM")',
              }}
            />
          </div>

          {/* Health Bar */}
          <div className="mb-8 px-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Shadow Beast&apos;s Health
            </p>
            <div className="w-full bg-primary/20 dark:bg-primary/30 rounded-full h-4">
              <div
                className="bg-primary h-4 rounded-full"
                style={{ width: "75%" }}
              />
            </div>
          </div>

          {/* Players */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 px-4">
            {/* Player 1 */}
            <div className="bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 p-4 rounded flex items-center justify-between">
              <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">
                  Player 1: Alex
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current Streak: 5 days 🔥
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAT6YhNaAM1Z8lkFjqIZouiBuQilzDctrE5WfVhXSmVcmIXL_qqb1TeuyPSdEt1tiiZfgl9e5Vngbexp_ZquScpoKwHDWwUCypec6YJYZS8DR7dzC7ks1K5BRFM5kFyhptiUXOI9e2WMgfEw_J1tMHuilB67GZPj7qdQp7E9MyKYltc_psq-S6FYysZkALibN8Nh7828_Cqn6SfPwhi3ebLr_aFJ88YxtnLyjO3xt_9202ueCNOZWogXPT1wPcyeS3NH_2dqxo8Ks")',
                }}
              />
            </div>

            {/* Player 2 */}
            <div className="bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 p-4 rounded flex items-center justify-between">
              <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">
                  Player 2: Sarah
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current Streak: 3 days
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuArCUStEWpU6O_c39k8VjcmY4OUOCa-OJiowYqklEufQwS78yWpVym_XmB0C9lhdYWJmDdefZCH_3Fpt1_-Vu0FFRh5q8ruOhlJndxmrFcSUY5RPaiWI2PkyReruvxYOto1losPZFLppVqKjqKcwU68UhFBj32AyY1YvIaaARjVVgbf--g5Zk6UxTgKJq93O8VBHdcsjXe252J_IGUIASEBeVxojYS8uQe8WF7Cn4WkjSoc4sMeO-mkQBIvEKzF4XW-NwQ_AmOs14U")',
                }}
              />
            </div>
          </div>

          {/* Strike Button */}
          <div className="px-4">
            <button className="w-full bg-primary text-white font-bold py-4 px-6 rounded text-lg tracking-wider uppercase hover:opacity-90 transition-opacity">
              Strike!
            </button>
          </div>
        </div>
      </main>

      
    </div>
  )
}

export default Battle