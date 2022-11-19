package com.ssafy.fly.service;

import com.ssafy.fly.database.mysql.entity.HarmonyFlower;
import com.ssafy.fly.database.mysql.repository.HarmonyFlowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class HarmonyFlowerServiceImpl implements HarmonyFlowerService {
    private final HarmonyFlowerRepository harmonyFlowerRepository;

    @Autowired
    public HarmonyFlowerServiceImpl(HarmonyFlowerRepository harmonyFlowerRepository) {
        this.harmonyFlowerRepository = harmonyFlowerRepository;
    }

    public void create(List<String> colorLst) {
        Collections.sort(colorLst);

        for (int i = 0; i < colorLst.size(); i++) {
            for (int j = i + 1; j < colorLst.size(); j++) {
                String[] arr = {colorLst.get(i), colorLst.get(j)};
                HarmonyFlower harmonyFlower = new HarmonyFlower();
                harmonyFlower.setColorOne(arr[0]);
                harmonyFlower.setColorTwo(arr[1]);
                harmonyFlower.setScore(1);
                harmonyFlowerRepository.save(harmonyFlower);
            }
        }
    }
}
