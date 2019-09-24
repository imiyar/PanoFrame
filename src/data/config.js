export default {
  videoList: [
    {
      id: 0,
      text: 'Yojiya Cafe',
      src: './videos/Yojiya Cafe.mp4',
      type: 'video/mp4',
    },
    {
      id: 1,
      text: 'MIT Chapel',
      src: './videos/MIT Chapel.mp4',
      type: 'video/mp4',
    },
  ],
  narrativeList: [
    [
      {
        id: 0,
        text: "Yojiya's Coffee & Environment",
        data: {"videoId":0,"muteOnStart":true,"init":{"lat":0,"lon":85,"fov":90,"rate":1,"subtitle":""},"max":{"lat":85,"lon":360,"fov":100},"min":{"lat":-85,"lon":-360,"fov":50},"return":{"lat":1,"lon":1,"fov":1},"title":"Yojiya's Coffee & Environment","keyframes":{"lat":[{"time":42,"value":-25},{"time":55,"value":-50},{"time":65,"value":-30},{"time":85,"value":-3}],"lon":[{"time":10,"value":160},{"time":20,"value":85},{"time":26,"value":20},{"time":33,"value":85},{"time":42,"value":130},{"time":55,"value":82},{"time":65,"value":266},{"time":85,"value":78}],"fov":[{"time":42,"value":50}],"rate":[{"time":0,"value":1.5},{"time":85,"value":2}],"subtitle":[{"time":0,"endTime":10,"value":"Yojiya is a brand from Kyoto famous for their oil blotting paper and other cosmetics."},{"time":10,"endTime":20,"value":"Besides cosmetics, Yojiya have also opened a café located near Hanamiko-ji Street in the Gion area."},{"time":20,"endTime":35,"value":"The comfortable atmosphere and great environment makes you feel cozy inside."},{"time":35,"endTime":42,"value":"Yojiya's logo is  widely known as the \"face of Yojiya.\" It can be seen everywhere in this coffee shop."},{"time":42,"endTime":56,"value":"This is the most famous matcha cappuccino with the face of Yojiya painted in matcha. The face is delicate and the coffee tastes very good."},{"time":56,"endTime":66,"value":"Even the napkin is well designed with their lovely logo."},{"time":70,"endTime":85,"value":"Their desserts are also delicious and served beautifully. I wish I could show your those desserts we ordered, but nothing left in the plate when we took this video."},{"time":90,"endTime":120,"value":"There are many souvenirs (T-shirts, candy, postcards, etc.) on the shelf over there. Travellers usually get some souvenirs here for their friends and family before leaving. "}]}},
      },
      {
        id: 1,
        text: 'Weekend Afternoon with Friends',
        data: {"videoId":0,"muteOnStart":false,"init":{"lat":-10,"lon":-35,"fov":60,"rate":1,"subtitle":""},"max":{"lat":85,"lon":360,"fov":100},"min":{"lat":-85,"lon":-360,"fov":40},"return":{"lat":1,"lon":1,"fov":1},"title":"Weekend Afternoon with Friends","keyframes":{"lat":[{"time":4,"value":10},{"time":10,"value":0},{"time":20,"value":0},{"time":30,"value":-10},{"time":52,"value":-10},{"time":98,"value":-30}],"lon":[{"time":4,"value":-145},{"time":10,"value":-215},{"time":20,"value":-180},{"time":30,"value":-135},{"time":52,"value":-30},{"time":70,"value":-220},{"time":98,"value":-230}],"fov":[{"time":20,"value":90},{"time":30,"value":75},{"time":98,"value":40}],"rate":[{"time":0,"value":1.5},{"time":20,"value":1},{"time":30,"value":2.5},{"time":47,"value":1.5},{"time":70,"value":2.5}],"subtitle":[{"time":0,"endTime":18,"value":"One weekend afternoon, me and my friends Holly and Wenzhe went to Yojiya Cafe in Kyoto. We just finished our dishes and decided to record a panoramic video of me drinking Yojiya's famous matcha cappuccino."},{"time":18,"endTime":24,"value":"I used a straw to drink from the bottom in order to keep the \"face of Yojiya\" on top of the coffee as long as possible."},{"time":24,"endTime":30,"value":"Holly said, \"Wow, amazing! It (the face) is moving down!\""},{"time":30,"endTime":52,"value":"Holly took out the napkin and wanted to show Yojiya's logo on the napkin in front of the camera. We all love the logo's specific design."},{"time":52,"endTime":70,"value":"But Wenzhe prefered to wipe his hand and face using his napkin, without considering the fact that we will use this video for a presentation."},{"time":70,"endTime":98,"value":"I was not sure about whether the \"face of Yojiya\" still can be seen from the camera at that time."},{"time":98,"endTime":120,"value":"You can barely see it because of the cream left on the side of the glass. We should have use the 360 camera's app to preview the video before we startted recording."}]}},
      },
    ],
    [],
  ],

  init: {
    lat: 0,
    lon: 0,
    fov: 75,
    rate: 1,
    subtitle: '',
  },

  max: {
    lat: 85,
    lon: 360,
    fov: 100,
  },

  min: {
    lat: -85,
    lon: -360,
    fov: 50,
  },

  return: {
    lat: 1,
    lon: 1,
    fov: 1,
  },
};
