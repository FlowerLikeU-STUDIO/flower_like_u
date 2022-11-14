package com.ssafy.fly.service;

import com.ssafy.fly.database.mysql.entity.HarmonyFlower;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HarmonyFlowerRepository extends JpaRepository<HarmonyFlower, Long> {
}
