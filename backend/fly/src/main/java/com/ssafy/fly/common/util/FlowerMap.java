package com.ssafy.fly.common.util;

import com.ssafy.fly.common.vo.FlowerVo;

import java.util.HashMap;
import java.util.Map;

public class FlowerMap {
    //PINK
    public static final FlowerVo[] F6B5C0 = {new FlowerVo(2,"pink_calla"),
            new FlowerVo(5,"pink_carnation"),new FlowerVo (21,"pink_gypsophila"),
            new FlowerVo(9,"pink_hydrangea"),new FlowerVo (34,"pink_lilium"),
            new FlowerVo(27,"pink_lisianthus"),new FlowerVo (13,"pink_peony"),new FlowerVo (17,"pink_rose")};

    //RED
    private static final FlowerVo[] F15168 = {new FlowerVo (6,"red_carnation"),
            new FlowerVo (22,"red_gypsophila"),new FlowerVo (14,"red_peony"),
            new FlowerVo (16,"red_rose"),new FlowerVo (37,"red_tulip")};
    //PURPLE
    private static final FlowerVo[] CFB4EF = {new FlowerVo (23,"purple_gypsophila"),
            new FlowerVo(10,"purple_hydrangea"),new FlowerVo (28,"purple_lisianthus"),
            new FlowerVo (19,"purple_rose")};
    //YELLOW
    private static final FlowerVo[] F3C46A = {new FlowerVo (3,"yellow_calla"),
            new FlowerVo (7,"yellow_carnation"),new FlowerVo (36,"yellow_freesia"),
            new FlowerVo (20,"yellow_gypsophila"),new FlowerVo (31,"yellow_lisianthus"),
            new FlowerVo (18,"yellow_rose"),new FlowerVo (26,"yellow_sunflower"),new FlowerVo (38,"yellow_tulip")};
    //BLUE
    private static final FlowerVo[] BDDFF3 = {new FlowerVo (24,"blue_gypsophila"),
            new FlowerVo (11,"blue_hydrangea"),new FlowerVo (32,"blue_lisianthus")};
    //WHITE
    private static final FlowerVo[] F6F4E3 = {new FlowerVo (0,"white_calla"),
            new FlowerVo (4,"white_carnation"),new FlowerVo (39,"white_chrysanthemum"),
            new FlowerVo (25,"white_gypsophila"),new FlowerVo (8,"white_hydrangea"),
            new FlowerVo (33,"white_lilium"),new FlowerVo (29,"white_lisianthus"),
            new FlowerVo (12,"white_peony"),new FlowerVo (15,"white_rose")};
    //LIGHTPINK
    private static final FlowerVo[] FCE3E3 = {new FlowerVo (1,"lightpink_calla"),
            new FlowerVo (35,"lightpink_lilium"),new FlowerVo (30,"lightpink_lisianthus")};

    private static Map<String,FlowerVo[]> map = new HashMap<>();

    public static Map<String,FlowerVo[]> ofMap() {
        if (map.isEmpty()) {
            map.put("FCE3E3",FCE3E3);
            map.put("F6F4E3",F6F4E3);
            map.put("BDDFF3",BDDFF3);
            map.put("F3C46A",F3C46A);
            map.put("CFB4EF",CFB4EF);
            map.put("F15168",F15168);
            map.put("F6B5C0",F6B5C0);
        }
        return map;
    }
}