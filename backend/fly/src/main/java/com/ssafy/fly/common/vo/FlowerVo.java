package com.ssafy.fly.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlowerVo {
    private final int id;
    private final String imgSrc;

    public FlowerVo(int id, String imgSrc) {
        this.id = id;
        this.imgSrc = imgSrc;
    }
}