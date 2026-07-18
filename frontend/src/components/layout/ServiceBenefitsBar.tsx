import React from 'react';

export default function ServiceBenefitsBar() {
  const benefits = [
    {
      icon: (
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path d="M22.9997 26.833H24.9164C27.0247 26.833 28.7497 25.108 28.7497 22.9997V3.83301H11.4997C8.62469 3.83301 6.11388 5.42382 4.81055 7.76215" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.83301 32.583C3.83301 35.7647 6.40134 38.333 9.58301 38.333H11.4997C11.4997 36.2247 13.2247 34.4997 15.333 34.4997C17.4413 34.4997 19.1663 36.2247 19.1663 38.333H26.833C26.833 36.2247 28.558 34.4997 30.6663 34.4997C32.7747 34.4997 34.4997 36.2247 34.4997 38.333H36.4163C39.598 38.333 42.1663 35.7647 42.1663 32.583V26.833H36.4163C35.3622 26.833 34.4997 25.9705 34.4997 24.9163V19.1663C34.4997 18.1122 35.3622 17.2497 36.4163 17.2497H38.8888L35.6114 11.5189C34.9214 10.3305 33.6564 9.58301 32.2764 9.58301H28.7497V22.9997C28.7497 25.108 27.0247 26.833 24.9163 26.833H22.9997" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.3333 42.1667C17.4504 42.1667 19.1667 40.4504 19.1667 38.3333C19.1667 36.2162 17.4504 34.5 15.3333 34.5C13.2162 34.5 11.5 36.2162 11.5 38.3333C11.5 40.4504 13.2162 42.1667 15.3333 42.1667Z" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M30.6663 42.1667C32.7834 42.1667 34.4997 40.4504 34.4997 38.3333C34.4997 36.2162 32.7834 34.5 30.6663 34.5C28.5492 34.5 26.833 36.2162 26.833 38.3333C26.833 40.4504 28.5492 42.1667 30.6663 42.1667Z" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M42.1667 23V26.8333H36.4167C35.3625 26.8333 34.5 25.9708 34.5 24.9167V19.1667C34.5 18.1125 35.3625 17.25 36.4167 17.25H38.8891L42.1667 23Z" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.83301 15.333H15.333" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.83301 21.083H11.4997" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.83301 26.833H7.66634" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Free Shipping',
      desc: 'You will love at great low prices',
    },
    {
      icon: (
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path d="M34.5 36.1483H33.0433C31.51 36.1483 30.0533 36.7425 28.98 37.8158L25.7024 41.055C24.2074 42.5308 21.7734 42.5308 20.2784 41.055L17.0008 37.8158C15.9275 36.7425 14.4517 36.1483 12.9375 36.1483H11.5C8.31833 36.1483 5.75 33.5992 5.75 30.4559V9.54498C5.75 6.40165 8.31833 3.85254 11.5 3.85254H34.5C37.6817 3.85254 40.25 6.40165 40.25 9.54498V30.4559C40.25 33.58 37.6817 36.1483 34.5 36.1483Z" stroke="#B78924" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 19.167C25.4665 19.167 27.4659 17.1675 27.4659 14.7011C27.4659 12.2347 25.4665 10.2354 23 10.2354C20.5336 10.2354 18.5342 12.2347 18.5342 14.7011C18.5342 17.1675 20.5336 19.167 23 19.167Z" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M30.6663 30.0148C30.6663 26.5648 27.2355 23.7666 22.9997 23.7666C18.7638 23.7666 15.333 26.5648 15.333 30.0148" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Customer Support',
      desc: '24 hours a day, 7 days a week',
    },
    {
      icon: (
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path d="M42.1667 28.75C42.1667 36.1675 36.1675 42.1667 28.75 42.1667L30.7625 38.8125" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.83301 17.2497C3.83301 9.83217 9.83217 3.83301 17.2497 3.83301L15.2372 7.18717" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M26.2588 8.5293L33.8871 12.9376L41.4388 8.54848" stroke="#B78924" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M33.8867 20.738V12.918" stroke="#B78924" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32.0854 4.23551L27.4854 6.78459C26.4504 7.35959 25.5879 8.81624 25.5879 10.0046V14.873C25.5879 16.0613 26.4312 17.518 27.4854 18.093L32.0854 20.6422C33.0629 21.198 34.6729 21.198 35.6695 20.6422L40.2695 18.093C41.3045 17.518 42.167 16.0613 42.167 14.873V10.0046C42.167 8.81624 41.3237 7.35959 40.2695 6.78459L35.6695 4.23551C34.692 3.69884 33.0821 3.69884 32.0854 4.23551Z" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.50391 29.6133L12.1131 34.0216L19.6839 29.6325" stroke="#B78924" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.1133 41.822V34.002" stroke="#B78924" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.3305 25.3195L5.73052 27.8686C4.69552 28.4436 3.83301 29.9002 3.83301 31.0886V35.957C3.83301 37.1453 4.67635 38.602 5.73052 39.177L10.3305 41.7262C11.308 42.282 12.918 42.282 13.9147 41.7262L18.5147 39.177C19.5497 38.602 20.4122 37.1453 20.4122 35.957V31.0886C20.4122 29.9002 19.5688 28.4436 18.5147 27.8686L13.9147 25.3195C12.918 24.7828 11.308 24.7828 10.3305 25.3195Z" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: '15 Days Returns',
      desc: 'Within 15 days for an exchange',
    },
    {
      icon: (
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path d="M3.83301 19.167H42.1663" stroke="#B78924" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.1339 39.2907H12.3397C5.53557 39.2907 3.81055 37.6041 3.81055 30.8766V15.1216C3.81055 9.02657 5.22894 7.07157 10.5764 6.7649C11.1131 6.74574 11.7072 6.72656 12.3397 6.72656H33.6339C40.438 6.72656 42.1631 8.41323 42.1631 15.1407V23.5932" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.5 30.667H19.1667" stroke="#B78924" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M42.1663 34.4997C42.1663 35.9372 41.7638 37.298 41.0546 38.448C39.7321 40.6713 37.298 42.1663 34.4997 42.1663C31.7013 42.1663 29.2672 40.6713 27.9447 38.448C27.2355 37.298 26.833 35.9372 26.833 34.4997C26.833 30.2638 30.2638 26.833 34.4997 26.833C38.7355 26.833 42.1663 30.2638 42.1663 34.4997Z" stroke="#B78924" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M31.5127 34.4994L33.4102 36.3969L37.4927 32.6211" stroke="#B78924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Flexible Payment',
      desc: 'Pay with multiple credit cards',
    },
  ];

  return (
    <div className="bg-[#1c1c1c] py-10 sm:py-6 w-full px-[6.5%]">
      <div className="w-full mx-auto max-w-none flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-center gap-6">
            {benefit.icon}
            <div className="text-left space-y-1">
              <h4 className="font-raleway font-medium text-[16px] sm:text-[14px] leading-tight text-white">
                {benefit.title}
              </h4>
              <p className="font-questrial font-normal text-[13px] sm:text-[12px] leading-relaxed text-[#FFFFFFB2]">
                {benefit.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
