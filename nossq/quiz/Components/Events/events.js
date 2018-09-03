import React, {Component} from 'react';
import EventsCard from './EventsCard/eventscard';
import _AppBar from '../Appbar/appbar';
import BGE from '../../Resources/img/bge.jpg'
import './component.css';
import './default.css';
import onet from '../../Resources/img/events/thumbs/1.jpg';
import twot from '../../Resources/img/events/thumbs/2.jpg';
import threet from '../../Resources/img/events/thumbs/3.jpg';

import one from '../../Resources/img/events/1.jpg';
import two from '../../Resources/img/events/2.jpg';
import three from '../../Resources/img/events/3.jpg';

//import grid from './grid.js';
import './events.css';

class Events extends Component {

    render() {



        return (
            <div style={{ height: '100vh', overflow: 'scroll' }} >
                <_AppBar color="rgba(255,255,255,1)" handleOpen={this.props.handleOpen} handleClose={this.props.handleClose} />
  

                <div className="main" style={{ marginTop: '15vh'}}>
                    <ul id="og-grid" className="og-grid">
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/athletic.png" data-title="ATHELETICS" data-description="The competition shall be conducted under the International Athletics Federation rules as adopted from time to time by AFI, unless otherwise modified. Each college will be entitled to enter not more than two competitors per event. For relay races, not more than an entry of four with one reserve per event shall be accepted.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fathletic.png?alt=media&token=b1759b47-bd3b-40ba-a1c6-89683930ce9e" alt="img01" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/badminton1.png" data-title="BADMINTON" data-description="The tournament for men and women section will be conducted on the lines of Inter State Badminton Championship. Number of players: Men: The number of players representing any college in a team can be a maximum of 5 members. Women: The number of players representing any college in a team can be a maximum of 3 members.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fbadminton1.png?alt=media&token=7fd5b576-3f6d-41b0-ac84-9156a922c68d" alt="img02" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/basketball1.png" data-title="BASKETBALL" data-description="The tournament will be conducted according to the rules of Internation Basketball Federation (FIBA). Maximum of 12 players">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fbasketball1.png?alt=media&token=ba78bcc8-d6da-465c-99a5-7d11befb0551" alt="img03" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/carom.png" data-title="CARROM" data-description=" Matches shall be played according to the rules of International Carrom Federation as adopted from time to time by the All India Carrom Federation unless otherwise modified. A team will consists of 2 players which can be either 2 men, 2 women or 1 man and 1 woman.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fcarom.png?alt=media&token=dc330913-1816-43c9-bae3-ac71a95e6aa3" alt="img01" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/chess.png" data-title="CHESS" data-description="The team consists of 5 players in which one is extra. The team may consists of any mix of men and women (eg: 3 Men, 2 Women). All the team members must belong to the same institute. Number of matches for each team is 6 which is subject to modification as decided by referee according to the available time.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fchess.png?alt=media&token=e6bd0f83-f792-4867-8fa9-672069c033f4" alt="img02" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/cricket1.png" data-title="CRICKET" data-description="Matches shall be played according to the ICC T20 rule book. The team consists of 16 players.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fcricket1.png?alt=media&token=d7a42d0a-9f10-4e7e-88f8-ddb54390b2f7" alt="img03" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/football1.png" data-title="FOOTBALL" data-description="Matches shall be played according to the rules of FIFA as adopted from time to time by the All India Football Federation unless otherwise modified. Every team shall submit a list of players, not exceeding 16, who may participate in the tournament.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Ffootball1.png?alt=media&token=46c6b1d3-dfec-4830-8cbb-bbe9c04fc73d" alt="img01" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/handball.png" data-title="HANDBALL" data-description="The tournament will be conducted according to the International Handball Federation Rules as adopted from time to time by the Indian Handball Federation, unless otherwise modified. A maximum of 12 players are allowed in a team in which 5 is reserve.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fhandball.png?alt=media&token=6d4a1f03-3adb-410f-99a4-605b509aa4bd" alt="img02" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/hockey1.png" data-title="HOCKEY" data-description="Matches shall be played according to the rules of the FIH (Fédération Internationale de Hockey) as adopted from time to time by the Indian Hockey Federation unless otherwise modified. Game will consist of two teams of <strong>16 players</strong> each. 11 players would enter the field at a time.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fhockey1.png?alt=media&token=f152eafd-aa3b-4ed3-8c66-731c14a5948b" alt="img03" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/KHO%20kho.png" data-title="KHO KHO" data-description="Rules given by the Kho Kho Federation of India will be followed. Each team consists of 12 players, but only 9 players take the field.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2FKHO%20kho.png?alt=media&token=5c638fc5-590f-4bad-9512-2ebba82aa157" alt="img01" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/LAWN%20tennis1.png" data-title="LAWN TENNIS" data-description="The rules of the International Tennis Federation as adopted from time to time by the All India Lawn Tennis Association shall apply, unless otherwise modified. The team strength should be minimum - 3, maximum - 4 for men, and minimum - 2, maximum - 4 for women.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2FLAWN%20tennis1.png?alt=media&token=9c37f49c-56cf-4fa5-847c-6e22c175db27" alt="img02" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/mr%20udghosh.png" data-title="MR. UDGHOSH" data-description="The competition will be conducted according to the NPC Men’s Physique Rules. There will be just a single category (open) for all the participants.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fmr%20udghosh.png?alt=media&token=b6b751e1-6702-4fd3-8be0-ad4c69b0a334" alt="img03" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/powerlifting.png" data-title="POWER LIFTING" data-description="The competition will be held as per the International Powerlifting Federation Rules unless otherwise modified. Only 2 participants would be allowed in each category from a college. Athletes in the sport are divided in five weight classes and placing is based on the total weight lifted on the three main lifts: Squat, Bench and Deadlift.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fpowerlifting.png?alt=media&token=f1165af5-55d5-41c8-a6a2-b65ab2be6ef3" alt="img01" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/skating.png" data-title="SKATING" data-description="The competition will be held as per the ISU (international Skating Union) rules. There will be 3 events: Skating Hockey: 5 team members per team,  Speed Skating: Individual event; Maximum of 2 participants from a college, Relay Race: 4 participants per team.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fskating.png?alt=media&token=dfafaf4a-e726-416a-b44c-d04d348e2dfe" alt="img02" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/sports%20quiz.png" data-title="SPORTS QUIZ" data-description="Cabbage bamboo shoot broccoli rabe chickpea chard sea lettuce lettuce ricebean artichoke earthnut pea aubergine okra brussels sprout avocado tomato.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fsports%20quiz.png?alt=media&token=d951dae0-0af7-4f6e-8322-a1c044b26ff5" alt="img03" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/squash.png" data-title="SQUASH" data-description="Squash competition shall be conducted under World Squash Federation rules adopted time to time by the Squash Racket Federation of India unless otherwise modified in these rules. Men: Every college should submit a list of either 3 or 4 players. Women: A college is allowed to submit individual entries (not exceeding 3).">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fsquash.png?alt=media&token=3b51e142-f128-42fc-a49a-4e745d8c5661" alt="img01" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/swimming1.png" data-title="SWIMMING" data-description="Swimming competition shall be conducted under FINA rules adopted time to time by the Swimming Federation of India unless otherwise modified in these rules. Each college shall be entitled to enter not more than 2 competitors per event. For relay races, not more than 4 entries with one reserve per event shall be allowed.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fswimming1.png?alt=media&token=28415699-6c64-4789-9953-bb7fb5b5dc2d" alt="img02" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/table%20tennis.png" data-title="TABLE TENNIS" data-description="The rules of the tournament will be of the International Table Tennis Federation as adopted from time to time by the Table Tennis Federation of India shall apply unless otherwise modified. There can be a maximum of 4 players and a minimum of 3 players in each team for men’s and maximum of 4 and minimum of 2 for women’s team.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Ftable%20tennis.png?alt=media&token=72abe4eb-9990-43cb-bc75-f1387080047e" alt="img03" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/taekwando1.png" data-title="TAEKWANDO" data-description=" The competition will be held as per the WTF (World Taekwondo Federation) rules. There will be two events: POOMSAE & BREAKING.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Ftaekwando1.png?alt=media&token=5f2b5164-1c07-4891-aaf0-6e7e78734429" alt="img01" />
                            </a>
                        </li>
                        <li>
                            <a href="#" data-largesrc="https://subhamg.github.io/Udghosh-17/Events/img/sporticon/volleyball1.png" data-title="VOLLEYBALL" data-description="The rules of the International Volleyball Federation as adopted from time to time by the All India Volleyball Association shall apply, unless otherwise modified. Each college must submit the list of players, not more than 12 players.">
                                <img src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsports250x250%2Fvolleyball1.png?alt=media&token=b28d2a0c-a6ad-414c-8139-7352fe19c588" alt="img02" />
                            </a>
                        </li>
                        
                    </ul>
                    <p>Filler text by <a href="http://veggieipsum.com/">Veggie Ipsum</a></p>
                    <a id="og-additems" href="#">add more</a>
                </div>


                {/* <div style={{ marginLeft: "15vh", marginRight: "15vh", marginTop: "15vh"}}>
                    <EventsCard
                        bg={BGE}
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Atheletics"
                        content1=""
                        content2=" "
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fbadminton.png?alt=media&token=dac7a2cd-9c37-4378-966b-1bb9eff5e18a"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Badminton"
                        content1=" "
                        content2={
                            ""
                        }
                        content3="
                            "
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fbasketball1.jpg?alt=media&token=180e944d-d80f-4cf5-830a-c1dfb2f70dfe"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="BasketBall"
                        content1=""
                        content2=""
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fcarrom.png?alt=media&token=08779b06-28fc-4c1f-9121-8329c0eca93c"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Carrom"
                        content1=" "
                        content2=" "
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fchess.png?alt=media&token=e7dcd417-68f8-445e-a573-02bafac6e0cb"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Chess"
                        content1=""
                        content2=""
                        content3=" "
                    />

                    <EventsCard
                        bg={"https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fcricket1.jpg?alt=media&token=2c8eb95d-eb8f-4abd-b216-9d53925275ed"}
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Cricket"
                        content1=""
                        content2=""
                    />

                    <EventsCard
                        bg={"https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Ffoot1.jpg?alt=media&token=50e68d44-090f-41c1-b4ce-beff51f480d4"}
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Football"
                        content1=""
                        content2=""
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fhandball.png?alt=media&token=c1b77184-7ec9-41a8-9c1f-4e66eba5e68f"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Handball"
                        content1=""
                        content2=""
                    />

                    <EventsCard
                        bg={"https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fhockey1.jpg?alt=media&token=19cd0367-8b8e-4b24-8e1d-16131c786d46"}
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Hockey"
                        content1=""
                        content2=""
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fkabaddi.png?alt=media&token=075e0e10-6962-40a9-a317-68b541661c77"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Kabaddi"
                        content1=" The tournament will be conducted according to the International Kabaddi Federation Rules as adopted from time to time by the Indian Kabaddi Federation, unless otherwise modified."
                        content2=""
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fkho_kho.png?alt=media&token=2cad512c-2039-4373-bd7e-66a1ed26087d"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Kho-kho"
                        content1=""
                        content2=""
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Flawn_tennis.png?alt=media&token=c9cf1349-66cd-48f9-8fcd-0de5a49783f4"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Lawn Tennis"
                        content1=""
                        content2=""
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fmr_udghosh.png?alt=media&token=844fc60a-e6fe-4db8-b37c-db9e0a33d50e"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Mr. Udghosh"
                        content1=""
                        content2=""
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fpower_l.png?alt=media&token=e19c1b01-6ed3-4559-bc36-d6da4d71ce2c"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Powerlifting"
                        content1=""
                        content2=""
                        content3=""
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fquiz.png?alt=media&token=915b5407-f9b8-4b42-a495-2ef103adacca"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Sports Quiz"
                        content1=""
                        content2=""
                        content3=""
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fsquash.png?alt=media&token=755cc764-70f4-4e71-b155-b09587befbac"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Squash"
                        content1=""
                        content2=""
                        content3=""
                    />

                    <EventsCard
                        bg={"https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Ftable_tennis1.jpg?alt=media&token=6feccb64-d0da-4dba-994b-e6e7dfbe4e01"}
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Table Tennis"
                        content1=""
                        content2=""
                    />

                    <EventsCard
                        bg={"https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fvoleyball1.jpg?alt=media&token=4d397b74-eea9-4dbc-82dd-c2c449059e8d"}
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="VolleyBall"
                        content1=""
                        content2=""
                    />

                    <EventsCard
                        bg="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/events%2Fweight_l.png?alt=media&token=d9cf5848-c0b3-46e9-8570-c9a2c6f016cc"
                        rules_href={"#"}
                        res_href={"#"}
                        sch={"#"}
                        title="Weightlifting"
                        content1="The competition will be held as per the International Weightlifting Federation Rules unless otherwise modified."
                        content2="Only 2 participants would be allowed in each category from a college."
                        content3="Athletes in the sport are divided in five weight classes and placing is based on the total weight lifted on the two main lifts: Snatch, Clean and Jerk."
                    />

                </div> */}
            </div>
        );
    }

}

export default Events;


// WEBPACK FOOTER //
// ./src/Components/Events/events.js