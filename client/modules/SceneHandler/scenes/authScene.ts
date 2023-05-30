import Scene from "../Scene";
import PedElement from "../elements/PedElement";
import ObjectElement from "../elements/ObjectElement";
import SwitchFloatingSceneCameraWithFade from "../SwitchFloationgSceneCameraWithFade";

// const CHARACTERS_CAMERA_OPTIONS = {
//     position: new mp.Vector3(-1385.120, -620.82, 32.899),
//     rotation: new mp.Vector3(-18.5885, 0, 123.2377)
// }

// const CHARACTERS_OPTIONS = [
//     {
//         pedOptions: {
//             position: new mp.Vector3(-1388.5789, -623.9827, 30.8147),
//             rotation: new mp.Vector3(5.0156, 5.0888, -2.5985),
//             animation:
//                 {
//                     dict:'anim@amb@nightclub@lazlow@hi_podium@',
//                     name: 'danceidle_mi_17_crotchgrab_laz'
//                 },
//             model: 'mp_m_freemode_01',
//         },
//         cameraOptions: {
//             position: new mp.Vector3(-1389.939, -621.472, 32.2),
//             rotation: new mp.Vector3(-23.6806, 0, -153.7517)
//         }
//     },
//     {
//         pedOptions: {
//             position: new mp.Vector3(-1390.2578, -622.6524, 30.8131),
//             rotation: new mp.Vector3(2.5497, 0, -88.8134),
//             scenarioName: 'WORLD_HUMAN_DRINKING',
//             model: 'mp_m_freemode_01',
//         },
//         cameraOptions: {
//             position: new mp.Vector3(-1388.017, -623.646, 32.137),
//             rotation: new mp.Vector3(-32, 0, 66.52)
//         }
//     },
//     {
//         pedOptions: {
//             position: new mp.Vector3(-1392.4794, -625.1284, 30.2960),
//             rotation: new mp.Vector3(0.0003, 0, -62.9997),
//             animation:
//                 {
//                     dict:'amb@prop_human_seat_chair@female@arms_folded@base',
//                     name: 'base'
//                 },
//             model: 'mp_f_freemode_01',
//         },
//         cameraOptions: {
//             position: new mp.Vector3(-1389.901, -623.538, 32.651),
//             rotation: new mp.Vector3(-43.9011, 0, 123.1206)
//         }
//     }
// ];

const authSceneCamera = new SwitchFloatingSceneCameraWithFade([
    [
        [new mp.Vector3(-312.2065, 600.6359, 176.0669), new mp.Vector3(-14.7316, 0, 87.4305)],
        [new mp.Vector3(-338.8491, 600.8691, 172.5677), new mp.Vector3(-3.7473, 0, 90.3820)],
        30000,
    ],
    [
        [new mp.Vector3(-377.2542, 586.3222, 183.0598), new mp.Vector3(-10.5260, 4.3419, -67.8844)],
        [new mp.Vector3(-334.1567, 599.7125, 171.6569), new mp.Vector3(-4.3055, 0, -96.1101)],
        30000,
    ],
    [
        [new mp.Vector3(-317.6255, 593.3036, 172.1674), new mp.Vector3(-2.6820, 0, -156.5273)],
        [new mp.Vector3(-342.3650, 598.3140, 172.4581), new mp.Vector3(1.7668,  -5.3386, 105.3167)],
        30000,
    ],
    [
        [new mp.Vector3(-315.4909, 563.5811, 183.8640), new mp.Vector3(-9.8079, 0, 16.8539)],
        [new mp.Vector3(-330.2535, 603.5623, 175.0152), new mp.Vector3(-21.5401, 1.1473, -85.8614)],
        30000,
    ],
    [
        [new mp.Vector3(-294.9429, 572.9749, 193.7722), new mp.Vector3(-5.9101, 2.1458, 137.9181)],
        [new mp.Vector3(-327.7307, 595.8958, 171.7792), new mp.Vector3(-0.1621, 0, -31.2546)],
        30000,
    ],
    [
        [new mp.Vector3(-343.5170, 554.3149, 180.2774), new mp.Vector3(-11.4219, 1.0887, 7.6716)],
        [new mp.Vector3(-336.8266, 593.2615, 172.9311), new mp.Vector3(-9.0596, 0, -13.3013)],
        30000,
    ],
    [
        [new mp.Vector3(-321.4196, 599.1630, 173.4498), new mp.Vector3(-17.3272, 0, -42.0387)],
        [new mp.Vector3(-343.7611, 574.0532, 184.2516), new mp.Vector3(1.6885, -5.3384, 134.8897)],
        30000,
    ],
], 4000, 0);

export const authScene = new Scene(new mp.Vector3(-325.121, 640.246, 172.401), authSceneCamera, 21);

// let isCharactersLoaded = false;
// let loadedCharactersPeds: PedElement[] = [];

// mp.events.add('authScene::loadCharacters', async (characters: any[]) => {
//     if (isCharactersLoaded)
//         return;

//     isCharactersLoaded = true;

//     for (let i = 0; i < characters.length && i < CHARACTERS_OPTIONS.length; i++) {
//         const character = characters[i];
//         const options = CHARACTERS_OPTIONS[i].pedOptions;

//         const ped = new PedElement({
//             ...options,
//             faceJson: JSON.stringify(character.faceData),
//             model: character.model,
//             outfit: character.outfit
//         });
//         authScene.addElement(ped);

//         ped.create(mp.players.local.dimension);

//         while (!ped.isLoaded()) {
//             await mp.game.waitAsync(50);
//         }

//         ped.onLoad();
//         loadedCharactersPeds.push(ped);
//     }
// });

// mp.events.add('authScene::removeCharacters', () => {
//     isCharactersLoaded = false;
//     authScene.switchSceneCamera(authSceneCamera);

//     for (let ped of loadedCharactersPeds) {
//         ped.destroy();
//         authScene.removeElement(ped);
//     }

//     loadedCharactersPeds = [];
// });

// mp.events.add('auth:hoverCharacter', (slot) => {
//     if (!loadedCharactersPeds[slot]) {
//         return;
//     }

//     const { position, rotation } = CHARACTERS_OPTIONS[slot].cameraOptions;
//     authScene.switchCamera(position, rotation, 900);
// });

authScene
.addElement(new PedElement({
    position: new mp.Vector3(-324.0053, 604.0095, 172.4014),
    rotation: new mp.Vector3(0, 0, 172.80),
    animation:
        {
            dict:'timetable@denice@ig_1',
            name: 'idle_b'
        },
    model: 'u_m_y_staggrm_01'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-332.623, 595.926, 171.754),
    rotation: new mp.Vector3(0, 0, 55.86),
    animation:
        {
            dict:'timetable@amanda@drunk@idle_a',
            name: 'idle_pinot'
        },
    model: 'a_m_y_jetski_01'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-324.939, 605.553, 172.401),
    rotation: new mp.Vector3(0, 0, -142.44),
    animation:
        {
            dict:'timetable@amanda@ig_3',
            name: 'ig_3_base_tracy'
        },
    model: 'a_f_y_topless_01'
 }))
.addElement(new PedElement({
    position: new mp.Vector3(-318.165, 602.385, 172.448),
    rotation: new mp.Vector3(0, 0, 132.90),
    animation:
        {
            dict:'switch@trevor@trev_smoking_meth',
            name: 'trev_smoking_meth_loop'
        },
    model: 'ig_stretch'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-337.610, 596.839, 171.955),
    rotation: new mp.Vector3(0, 0, 161.86),
    animation:
        {
            dict:'amb@world_human_bum_standing@drunk@base',
            name: 'base'
        },
    model: 'a_m_y_beach_03'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-333.539, 598.308, 172.00),
    rotation: new mp.Vector3(0, 0, 148.99),
    animation:
        {
            dict:'rcmtmom_1leadinout',
            name: 'tmom_1_rcm_p3_leadout_loop'
        },
    model: 'a_m_y_beach_01'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-320.533, 602.557, 172.454),
    rotation: new mp.Vector3(0, 0, -79.26),
    animation: {
        dict: 'timetable@lamar@ig_3',
        name: '003131_01_gc_las_ig_3_p3_traffic_jam_stretch'
    },
    model: 'g_m_y_mexgoon_03'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-343.145, 603.305, 171.957),
    rotation: new mp.Vector3(0, 0, 153.98),
    animation:
        {
            dict:'amb@world_human_bum_slumped@male@laying_on_right_side@idle_b',
            name: 'idle_d'
        },
    model: 'a_m_o_tramp_01'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-343.355, 600.416, 171.957),
    rotation: new mp.Vector3(0, 0, -112.88),
    animation:
        {
            dict:'amb@world_human_cop_idles@female@base',
            name: 'base'
        },
    model: 's_m_y_cop_01'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-344.454, 601.442, 171.957),
    rotation: new mp.Vector3(0, 0, -112.97),
    animation:
        {
            dict:'amb@world_human_cop_idles@female@idle_a',
            name: 'idle_a'
        },
    model: 's_f_y_cop_01'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-341.6478, 599.8355, 171.9561),
    rotation: new mp.Vector3(0, 0, 66.25),
    animation:
        {
            dict:'amb@world_human_hang_out_street@female_arms_crossed@base',
            name: 'base'
        },
    model: 'a_f_y_beach_02'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-333.461, 599.598, 171.670),
    rotation: new mp.Vector3(0, 0, -45.53),
    scenarioName:'WORLD_CAT_SLEEPING_GROUND',
    model: 'a_c_cat_01'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-326.184, 598.265, 171.051),
    rotation: new mp.Vector3(0, 0, -103.63),
    animation: {
        dict: 'anim@amb@nightclub@dancers@crowddance_facedj@low_intesnsity',
        name: 'li_dance_facedj_09_v1_male^6'
    },
    model: 'a_f_y_juggalo_01'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-324.819, 597.355, 171.051),
    rotation: new mp.Vector3(0, 0, 25.45),
    animation: {
        dict: 'anim@amb@nightclub@dancers@crowddance_facedj@hi_intensity',
        name: 'hi_dance_facedj_17_v1_female^5'
    },
    model: 'a_m_y_musclbeac_02'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-324.694, 599.436, 171.051),
    rotation: new mp.Vector3(0, 0, 118.21),
    animation: {
        dict: 'anim@amb@nightclub@dancers@crowddance_facedj@hi_intensity',
        name: 'hi_dance_facedj_09_v2_female^3'
    },
    model: 'ig_tracydisanto'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-319.420, 595.443, 172.854),
    rotation: new mp.Vector3(0, 0, -45.03),
    animation: {
        dict: 'rcm_epsilonism4',
        name: 'esp_4_ig_1_jimmy_lookaround_base_jb'
    },
    model: 'ig_g'
}))
.addElement(new PedElement({
    position: new mp.Vector3(-315.702, 596.465, 172.854),
    rotation: new mp.Vector3(0, 0, 63.68),
    animation: {
        dict: 'rcm_barry3',
        name: 'barry_3_sit_loop'
    },
    model: 'ig_ramp_gang'
}))
.addElement(new ObjectElement({
    model: 'prop_boombox_01',
    position: new mp.Vector3(-322.6935, 601.7344, 171.6930),
    rotation: new mp.Vector3(0, 0, -54.5985)
}))
.addElement(new ObjectElement({
    model: 'prop_wall_light_01a',
    position: new mp.Vector3(-326.7241, 603.4323, 170.6412),
    rotation: new mp.Vector3(-4.2688, 1.7999, -21.1998)
}))
.addElement(new ObjectElement({
    model: 'prop_wall_light_01a',
    position: new mp.Vector3(-324.8136, 595.2762, 170.8262),
    rotation: new mp.Vector3(-2.6680, -1, 161.9909)
}))
.addElement(new ObjectElement({
    model: 'prop_spot_01',
    position: new mp.Vector3(-325.3034, 610.4017, 175.6964),
    rotation: new mp.Vector3(40.4001, 4, -46.5971)
}))
.addElement(new ObjectElement({
    model: 'prop_ld_farm_table02',
    position: new mp.Vector3(-328.8811, 606.9308, 171.5895),
    rotation: new mp.Vector3(0, 0, 96.2944)
}))
.addElement(new ObjectElement({
    model: 'prop_wall_light_14b',
    position: new mp.Vector3(-312.7681, 601.8895, 174.0426),
    rotation: new mp.Vector3(0, 0, -29.8997)
}))
.addElement(new ObjectElement({
    model: 'prop_wall_light_05c',
    position: new mp.Vector3(-338.8908, 602.9319, 174.6557),
    rotation: new mp.Vector3(0, 0, -25.5997)
}))