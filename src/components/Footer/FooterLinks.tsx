import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import classes from './FooterLinks.module.css';
import { Logo } from '../Header/Header';

const data = [
  {
    title: 'Project',
    links: [
      { label: 'Contribute', link: 'https://github.com/henshalb/wellnote' },
      { label: 'Releases', link: 'https://github.com/henshalb/wellnote/releases' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Join Discord', link: 'https://discord.gg/EuUD9RgFB4' },
      { label: 'GitHub issues', link: 'https://github.com/henshalb/wellnote/issues' },
    ],
  },
];

export function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        target='_blank'
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size={"lg"} className={classes.inner}>
        <div className={classes.logo}>
          <Logo opacity={0.3} />
          <Text size="xs" c="dimmed" className={classes.description}>
            Browser based minimal, fast and feature rich note taker.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container size={"lg"} className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          Open source project
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon onClick={()=>{
            window.open("https://github.com/henshalb/wellnote", "_blank");
          }} size="lg" color="gray" variant="subtle">
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}