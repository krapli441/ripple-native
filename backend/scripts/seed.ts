// scripts/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { TagService } from '../src/music-tag/music-tag.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tagService = app.get(TagService);

  const tags = [
    { name: '러닝' },
    { name: '드라이브' },
    { name: '휴식' },
    { name: '출근길' },
    { name: '퇴근길' },
    { name: '산책' },
    { name: '술 한잔' },
    { name: '운동' },
    { name: '명상' },
    { name: '기분 전환' },
    { name: '비 내리는 날' },
    { name: '분노' },
    { name: '면접' },
    { name: '자신감 상승' },
    { name: '전투력 상승' },
    { name: '자기 개발' },
    { name: '힙합' },
    { name: '하우스' },
    { name: '그라임' },
    { name: '게이밍' },
    { name: '헬스장' },
    { name: '자동차' },
    { name: '와인딩' },
    { name: '페스티벌' },
    { name: '집중' },
    { name: '일렉트로니카' },
    { name: 'IDM' },
    { name: '투자' },
    { name: '떡상' },
    { name: '떡락' },
    { name: '춤 연습' },
    { name: '공부' },
    { name: '연인과 함께' },
    { name: '우울할 때' },
    { name: '썸탈 때' },
    { name: 'ISTJ' },
    { name: 'ISTP' },
    { name: 'ISFJ' },
    { name: 'ISFP' },
    { name: 'INTJ' },
    { name: 'INTP' },
    { name: 'INFJ' },
    { name: 'INFP' },
    { name: 'ESTJ' },
    { name: 'ESTP' },
    { name: 'ESFJ' },
    { name: 'ESFP' },
    { name: 'ENTJ' },
    { name: 'ENTP' },
    { name: 'ENFJ' },
    { name: 'ENFP' },
  ];

  await tagService.seedTags(tags);

  await app.close();
}

seed()
  .then(() => console.log('시딩 완료'))
  .catch((error) => {
    console.error('시딩 실패', error);
    process.exit(1);
  });
